import { Injectable } from '@nestjs/common';
import {
    DocumentAnalysisClient,
    AzureKeyCredential,
    AnalyzeResult,
} from '@azure/ai-form-recognizer';
import * as fs from 'fs';

interface ParsedInvoiceItemInternal {
    productName: string;
    quantity: number;         // фінальна кількість в штука
    purchasePrice: number;    // ціна за одиницю (шт або ящик) В КОПІЙКАХ
    unitType: 'PIECE' | 'BOX';
    boxSize?: number;          // якщо BOX — скільки штук в ящику
}

@Injectable()
export class AzureOcrService {
    private client: DocumentAnalysisClient;

    constructor() {
        const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
        const apiKey = process.env.AZURE_FORM_RECOGNIZER_KEY;

        if (!endpoint || !apiKey) {
            throw new Error('Azure credentials not configured');
        }

        this.client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    }

    /**
     * Витягує позиції з урахуванням специфіки агента
     */
    async extractInvoiceItems(filePath: string, agentId: number): Promise<ParsedInvoiceItemInternal[]> {
        console.log(`[OCR] Початок для agentId=${agentId}, файл: ${filePath}`);

        const buffer = fs.readFileSync(filePath);

        // Для агентів 4 та 5 використовуємо layout для точної таблиці
        if (agentId === 4 || agentId === 5) {
            const poller = await this.client.beginAnalyzeDocument('prebuilt-layout', buffer);
            const result = await poller.pollUntilDone();

            if (agentId === 4) return this.parseForAgent4(result);
            if (agentId === 5) return this.parseForAgent5(result);
        }

        // Fallback для інших агентів — використовуємо prebuilt-invoice
        const poller = await this.client.beginAnalyzeDocument('prebuilt-invoice', buffer);
        const result = await poller.pollUntilDone();
        const rawItems = this.extractFromPrebuilt(result);


        return rawItems.map(item => ({
            productName: item.productName.trim(),
            quantity: item.quantity || 1,
            purchasePrice: Math.round((item.unitPrice || 0) * 100), // ✅ в копійках
            unitType: 'PIECE',
        }));
    }

    private extractFromPrebuilt(result: AnalyzeResult): Array<{ productName: string; quantity: number; unitPrice: number }> {
        const items: any[] = [];

        const invoice = result.documents?.[0];
        if (!invoice?.fields?.Items) {
            return items;
        }

        // Перевірка, що Items є масивом
        const itemsField = invoice.fields.Items;
        if (itemsField.kind !== 'array' || !itemsField.values) {
            return items;
        }


        for (let i = 0; i < itemsField.values.length; i++) {
            const item = itemsField.values[i];
            if (item.kind !== 'object' || !item.properties) continue;

            const props = item.properties;
            const desc = props.Description?.kind === 'string' ? props.Description.value?.trim() ?? '' : '';
            if (!desc) {
                continue;
            }

            let qty = 0;
            if (props.Quantity?.kind === 'number') {
                qty = props.Quantity.value ?? 0;
            } else if (props.Quantity?.kind === 'string') {
                const qtyStr = (props.Quantity.value ?? '0').replace(',', '.').replace(/[^0-9.]/g, '');
                qty = parseFloat(qtyStr) || 0;
            }

            let price = 0;
            const up = props.UnitPrice;
            if (up?.kind === 'currency') {
                price = up.value?.amount ?? 0;
            } else if (up?.kind === 'number') {
                price = up.value ?? 0;
            } else if (up?.kind === 'string') {
                const priceStr = (up.value ?? '0').replace(',', '.').replace(/[^0-9.]/g, '');
                price = parseFloat(priceStr) || 0;
            }

            // Фільтр сміття
            if (/вул\.?|м\.|тел\.?|№/i.test(desc)) {
                continue;
            }

            items.push({ productName: desc, quantity: qty, unitPrice: price });
        }

        return items;
    }

    /**
     * Спеціальний парсер для агента 4 (Горинський формат)
     * 
     * Структура таблиці:
     * - Колонка 2: Назва товару
     * - Колонка 3: Кількість
     * - Колонка 4: Одиниці виміру (шт/ящ)
     * - Колонка 5: Ціна за одиницю
     * 
     * ЛОГІКА:
     * - Якщо одиниця = "ящ" → множимо кількість на boxSize з назви
     * - Якщо одиниця = "шт" → беремо кількість як є
     */
    private parseForAgent4(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 4] Парсинг таблиці`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells || cells.length < 5) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const unitCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawUnit = unitCell?.content?.trim() ?? '';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            if (!rawName || /уcього|вул\.|тел\.|№/i.test(rawName)) continue;

            // --- КІЛЬКІСТЬ (базова з таблиці) ---
            let baseQty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (baseQty <= 0) continue;

            // --- ЦІНА (копійки) ---
            const priceMatch = rawPrice.match(/(\d+)[,.]?(\d{0,2})/);
            const priceUAH = priceMatch
                ? parseFloat(`${priceMatch[1]}.${priceMatch[2] || '00'}`)
                : 0;

            if (priceUAH <= 0) continue;

            const priceCents = Math.round(priceUAH * 100);

            // --- ЛОГІКА ОДИНИЦЬ ---
            let finalQty = baseQty;
            let unitType: 'PIECE' | 'BOX' = 'PIECE';
            let boxSize: number | undefined = undefined;

            const isBox = /ящ/i.test(rawUnit);

            if (isBox) {
                // Якщо одиниця = "ящ" → шукаємо boxSize в назві
                // Спочатку шукаємо "Nшт/ящ" або "Nшт ящ"
                let boxSizeMatch = rawName.match(/(\d+)\s*шт[\s\/]*ящ/i);

                if (!boxSizeMatch) {
                    // Якщо не знайшли, шукаємо одиницю виміру в кінці назви: "1кг", "500г", "1л" тощо
                    const weightMatch = rawName.match(/(\d+(?:[,.]\d+)?)\s*(кг|г|л|мл)\s*$/i);
                    if (weightMatch) {
                        const value = parseFloat(weightMatch[1].replace(',', '.'));
                        const unit = weightMatch[2].toLowerCase();

                        // Конвертуємо в штуки (для кг/л - це кількість, для г/мл - перераховуємо)
                        if (unit === 'кг' || unit === 'л') {
                            boxSize = Math.round(value);
                        } else if (unit === 'г') {
                            boxSize = Math.round(value / 1000);
                        } else if (unit === 'мл') {
                            boxSize = Math.round(value / 1000);
                        }
                        console.log(`🔍 Знайдено одиницю виміру: ${weightMatch[0]} → boxSize=${boxSize}`);
                    }
                } else {
                    boxSize = parseInt(boxSizeMatch[1], 10);
                }

                // Якщо все ще не знайшли - fallback 30
                if (!boxSize || boxSize <= 0) {
                    boxSize = 30;
                    console.warn(`⚠️ boxSize не визначено, використовую fallback: 30`);
                }

                finalQty = baseQty * boxSize; // перетворюємо ящики в штуки
                unitType = 'BOX';

                console.log(`✔ [ЯЩИК] ${baseQty} ящ × ${boxSize} шт = ${finalQty} шт @ ${priceCents}коп`);
            } else {
                // Якщо одиниця = "шт" → беремо кількість як є
                finalQty = baseQty;
                console.log(`✔ [ШТУКИ] ${finalQty} шт @ ${priceCents}коп`);
            }

            // Очищуємо назву від зайвої інформації
            rawName = rawName
                .replace(/,?\s*\d+\s*шт[\s\/]*ящ/gi, '')
                .replace(/\s*ящ\.?\s*$/gi, '')
                .replace(/\s*\d+(?:[,.]\d+)?\s*(кг|г|л|мл)\s*$/gi, '') // ✅ видаляємо одиниці виміру
                .trim();

            items.push({
                productName: rawName,
                quantity: finalQty,
                purchasePrice: priceCents, // ціна за одиницю в копійках
                unitType,
                boxSize: unitType === 'BOX' ? boxSize : undefined,
            });
        }

        console.log(`\n✅ Агент 4: витягнуто ${items.length} позицій`);
        return items;
    }

    /**Агент 5 ШУВАР */
    private parseForAgent5(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 5] Парсинг таблиці Горинського`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Таблиця має ${table.rowCount} рядків і ${table.columnCount} колонок`);

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells || cells.length < 5) {
                console.log(`⚠️ [ROW ${rowIdx}] Пропущено - недостатньо комірок (${cells?.length || 0})`);
                continue;
            }

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5); // ✅ ВИПРАВЛЕНО: колонка 5 (було 6)

            const rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            console.log(`🔍 [ROW ${rowIdx}] name="${rawName}" qty="${rawQty}" price="${rawPrice}"`);

            if (!rawName || /уcього|вул\.|тел\.|№/i.test(rawName)) {
                console.log(`⚠️ [SKIP] Назва пропущена або це сміття`);
                continue;
            }

            // --- КІЛЬКІСТЬ ---
            // ВАЖЛИВО: кома тут - роздільник тисяч, а не десяткова крапка
            // "6,000" означає 6 штук, а не 6000
            // "15,000" означає 15 штук, а не 15000

            let qty: number;

            // Якщо є кома, перевіряємо чи це роздільник тисяч
            if (rawQty.includes(',')) {
                // Якщо після коми рівно 3 нулі - це роздільник тисяч
                const commaPattern = /^(\d+),000$/;
                const match = rawQty.match(commaPattern);

                if (match) {
                    // "6,000" → 6, "15,000" → 15
                    qty = parseInt(match[1], 10);
                    console.log(`✔ [QTY] Кома як роздільник тисяч: "${rawQty}" → ${qty}`);
                } else {
                    // Якщо паттерн не підходить - просто видаляємо кому
                    qty = Number(rawQty.replace(/,/g, '')) || 0;
                    console.log(`✔ [QTY] Інший формат з комою: "${rawQty}" → ${qty}`);
                }
            } else {
                qty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
                console.log(`✔ [QTY] Без коми: "${rawQty}" → ${qty}`);
            }

            if (qty <= 0) {
                console.warn(`⚠️ [SKIP] Некоректна кількість: "${rawQty}" → ${qty}`);
                continue;
            }

            // --- ЦІНА (колонка 5 - ціна без ПДВ) ---
            // Формат: "52,400" або "52.400" або "52400"
            // Перші 2-3 цифри - гривні, останні 2-3 цифри - копійки

            if (!rawPrice || rawPrice === '0') {
                console.warn(`⚠️ [SKIP] Ціна відсутня або нульова: "${rawPrice}"`);
                continue;
            }

            const priceMatch = rawPrice.match(/(\d+)[,.]?(\d{2,3})/);
            if (!priceMatch) {
                console.warn(`⚠️ [SKIP] Не вдалося розпізнати ціну: "${rawPrice}"`);
                continue;
            }

            const priceUAH = parseFloat(`${priceMatch[1]}.${priceMatch[2]}`);

            if (priceUAH <= 0) {
                console.warn(`⚠️ [SKIP] Некоректна ціна: "${rawPrice}" → ${priceUAH}`);
                continue;
            }

            // ✅ Конвертуємо в копійки
            const priceCents = Math.round(priceUAH * 100);

            // Очищуємо назву від одиниць виміру
            const cleanName = rawName
                .replace(/\s+\d+шт$/i, '')
                .replace(/\s+\d+г$/i, '')
                .replace(/\s+\d+кг$/i, '')
                .replace(/\s+\d+,?\d*л$/i, '')
                .trim();

            console.log(`✅ [ROW ${rowIdx}] "${cleanName}" × ${qty} шт @ ${priceCents} коп (${priceUAH} грн)`);

            items.push({
                productName: cleanName,
                quantity: qty,
                purchasePrice: priceCents, // ціна за одиницю в копійках
                unitType: 'PIECE',
            });
        }

        console.log(`\n✅ Агент 5*: витягнуто ${items.length} позицій`);
        return items;
    }

}