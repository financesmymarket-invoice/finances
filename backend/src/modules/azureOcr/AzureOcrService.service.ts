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
        if (agentId === 2 || agentId === 4 || agentId === 5 || agentId === 6 || agentId === 9 || agentId === 10 || agentId === 11)  {
            const poller = await this.client.beginAnalyzeDocument('prebuilt-layout', buffer);
            const result = await poller.pollUntilDone();

            if (agentId === 2) return this.parseForAgent2(result);
            if (agentId === 4) return this.parseForAgent4(result);
            if (agentId === 5) return this.parseForAgent5(result);
            if (agentId === 6) return this.parseForAgent6(result);
            if (agentId === 9) return this.parseForAgent7(result);
            if (agentId === 10) return this.parseForAgent10(result);
            if (agentId === 11) return this.parseForAgent11(result);
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

    /** Агент 2 - Олма (структура з накладної) */
    private parseForAgent2(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        const items: ParsedInvoiceItemInternal[] = [];
        if (!result.tables?.length) return items;

        const table = result.tables[0];
        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        // 1. Знаходимо мапінг колонок динамічно (по заголовку)
        // Або використовуємо відносні позиції
        rows.forEach((cells, rowIdx) => {
            if (rowIdx === 0) return; // Пропускаємо заголовок

            // Сортуємо клітинки зліва направо за індексом колонки
            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // Шукаємо клітинку з назвою (найширша, зазвичай colIndex 1)
            const nameCell = cells.find(c => c.columnIndex === 1);
            if (!nameCell || nameCell.content.length < 5) return;

            // --- ЛОГІКА "ЖИВУЧОСТІ" ---
            // Замість фіксованих індексів, шукаємо потрібні дані в УСІХ клітинках рядка
            let rawQty = "";
            let rawPrice = "";
            let rawUnit = "";

            cells.forEach(cell => {
                const content = cell.content.trim();

                // Якщо клітинка містить ТІЛЬКИ число (можливо з комою) — це потенційно кількість або ціна
                if (/^\d+([,. ]\d+)?$/.test(content)) {
                    if (cell.columnIndex === 2) rawQty = content;
                    // Ціна зазвичай у колонці 4, але через ручку може бути в 5 або 6
                    if (cell.columnIndex >= 4 && cell.columnIndex <= 6) rawPrice = content;
                }

                // Одиниця виміру
                if (/шт|пл|ящ/i.test(content)) {
                    rawUnit = content;
                }
            });

            // Якщо ціна не знайшлась у "своїй" колонці, беремо останню клітинку, де є цифри
            if (!rawPrice) {
                const numericCells = cells.filter(c => /[\d,.]+/.test(c.content));
                if (numericCells.length >= 2) {
                    rawPrice = numericCells[numericCells.length - 2].content; // Передостання зазвичай ціна
                }
            }

            // Очищення назви від штампів (Важливо для рядків 16-23)
            let cleanName = nameCell.content
                .replace(/ФІЗИЧНА ОСОБА|ПІДПРИЄМЕЦЬ|ГОРИНСЬКИЙ|ДЛЯ ДОКУМЕНТІВ|Ігор Іванович/gi, '')
                .replace(/\n/g, ' ')
                .trim();

            const priceUAH = parseFloat(rawPrice.replace(',', '.')) || 0;
            const qty = parseFloat(rawQty.replace(',', '.')) || 0;

            // Якщо ми знайшли назву та ціну — додаємо, навіть якщо структура колонок попливла
            if (cleanName.length > 5 && priceUAH > 0) {
                items.push({
                    productName: cleanName,
                    quantity: qty || 1,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: /ящ/i.test(rawUnit) ? 'BOX' : 'PIECE',
                });
            }
        });

        return items;
    }


    /**Агент 4 Лімо */
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

            console.log(`\n🔍 Рядок ${rowIdx}: "${rawName}"`);

            if (!rawName || /уcього|вул\.|тел\.|№/i.test(rawName)) continue;

            rawName = rawName
                .replace(/:\s*(selected|unselected)\s*:/gi, '')
                .replace(/\n/g, ' ')
                .trim();

            let baseQty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (baseQty <= 0) continue;

            const cleanPrice = rawPrice.replace(':', '.');
            const priceMatch = cleanPrice.match(/(\d+)[,.]?(\d{0,2})/);
            const priceUAH = priceMatch
                ? parseFloat(`${priceMatch[1]}.${priceMatch[2] || '00'}`)
                : 0;

            if (priceUAH <= 0) continue;

            let finalQty = baseQty;
            let unitType: 'PIECE' | 'BOX' = 'PIECE';
            let boxSize: number | undefined = undefined;
            let purchasePriceCents: number;

            const isBox = /ящ/i.test(rawUnit);

            if (isBox) {
                unitType = 'BOX';

                let boxSizeMatch = rawName.match(/(\d+)\s*шт[\s\/]*ящ/i);

                if (boxSizeMatch) {
                    boxSize = parseInt(boxSizeMatch[1], 10);
                } else {
                    const weightMatch = rawName.match(/(\d+(?:[,.]\d+)?)\s*(кг|г|л|мл)/i);

                    if (weightMatch) {
                        const value = parseFloat(weightMatch[1].replace(',', '.'));
                        const unit = weightMatch[2].toLowerCase();

                        if (unit === 'кг' || unit === 'л') {
                            boxSize = Math.round(value);
                        } else if (unit === 'г' || unit === 'мл') {
                            boxSize = Math.round(value / 1000);
                        }

                        if (!boxSize || boxSize <= 0) boxSize = 1;
                    }
                }

                if (!boxSize || boxSize <= 0) boxSize = 30;

                finalQty = baseQty * boxSize;
                purchasePriceCents = Math.round(priceUAH * 100);
            } else {
                finalQty = baseQty;
                purchasePriceCents = Math.round(priceUAH * 100);
            }

            // ❗ БІЛЬШЕ НЕ ВИДАЛЯЄМО ЛІТРАЖ / ВАГУ
            rawName = rawName
                .replace(/,?\s*\d+\s*шт[\s\/]*ящ/gi, '')
                .replace(/\s*ящ\.?\s*$/gi, '')
                .trim();

            items.push({
                productName: rawName,
                quantity: finalQty,
                purchasePrice: purchasePriceCents,
                unitType,
                boxSize: unitType === 'BOX' ? boxSize : undefined,
            });
        }

        return items;
    }


    /**Агент 5 ШУВАР */
    private parseForAgent5(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 5] Парсинг таблиці Шувара`);

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
            if (!cells || cells.length < 4) {
                console.log(`⚠️ [ROW ${rowIdx}] Пропущено - недостатньо комірок (${cells?.length || 0})`);
                continue;
            }

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5);

            let rawName = nameCell?.content?.trim() ?? '';
            let rawQty = qtyCell?.content?.trim() ?? '0';
            let rawPrice = priceCell?.content?.trim() ?? '0';

            // --- пропускаємо службові рядки ---
            if (!rawName || /назва|товару|штрихкод|усього|податок|оплати/i.test(rawName)) {
                continue;
            }

            // --- ЗАЛИШАЄМО ПОВНУ НАЗВУ ---
            const cleanName = rawName.replace(/:\s*(selected|unselected)\s*:/gi, '').replace(/\n/g, ' ').trim();

            // --- КІЛЬКІСТЬ ---
            const cleanQty = rawQty.replace(/:\s*(selected|unselected)\s*:/gi, '').replace(/\s/g, '');
            const qty = parseInt(cleanQty.replace(/[^0-9]/g, ''), 10) || 0;
            if (qty <= 0) continue;

            // --- ЦІНА ---
            const cleanPrice = rawPrice.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
            const price = parseFloat(cleanPrice) || 0;
            if (price <= 0) continue;

            const priceCents = Math.round(price * 100);

            items.push({
                productName: cleanName,
                quantity: qty/1000,
                purchasePrice: priceCents,
                unitType: 'PIECE',
            });
        }

        return items;
    }


    /**Агент 6 - Флінти  */
    private parseForAgent6(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 6] Парсинг таблиці`);

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
            if (!cells || cells.length < 6) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            if (!rawName || /товар|к-ть|од|разом|знижка|округлення|вага|одна тисяча/i.test(rawName)) continue;

            rawName = rawName
                .replace(/:\s*(selected|unselected)\s*:/gi, '')
                .replace(/\n/g, ' ')
                .trim();

            const qty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (qty <= 0) continue;

            const cleanPrice = rawPrice.replace(',', '.');
            const priceMatch = cleanPrice.match(/(\d+)\.?(\d{0,2})/);
            const priceUAH = priceMatch
                ? parseFloat(`${priceMatch[1]}.${priceMatch[2] || '00'}`)
                : 0;

            if (priceUAH <= 0) continue;

            const priceCents = Math.round(priceUAH * 100);

            // ❗ БІЛЬШЕ НЕ ВИДАЛЯЄМО г/кг/л
            rawName = rawName
                .replace(/\s*\(\d+шт\)\s*$/gi, '')
                .replace(/\s*Б\/Я\s*$/gi, '')
                .replace(/\s*SB\s*$/gi, '')
                .replace(/\s*НШК\s*$/gi, '')
                .replace(/\s*НВ\s*$/gi, '')
                .trim();

            items.push({
                productName: rawName,
                quantity: qty,
                purchasePrice: priceCents,
                unitType: 'PIECE',
            });
        }

        return items;
    }

    /**Агент 7 - Біскотті  */
    private parseForAgent7(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 7] Парсинг Biscotti (ящики + вага з назви)`);
        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) return items;

        const table = result.tables[0];
        const rows = new Map<number, any[]>();

        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // Перевіряємо, чи це рядок з товаром (має бути порядковий номер у першій колонці)
            const firstCell = cells.find(c => c.columnIndex === 0);
            if (!firstCell || !/^\d+$/.test(firstCell.content.trim())) return;

            // Визначаємо ключові клітинки
            const nameCell = cells.find(c => c.columnIndex === 3);
            const boxesCell = cells.find(c => c.columnIndex === 4); // К-сть ящиків
            // Ціна за кг: назва в col 3, тоді +2 стовпчика = col 5
            const priceCell = cells.find(c => c.columnIndex === 5);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // 1. Витягуємо вагу одного ящика з назви (наприклад, "2,1 кг" або "0,4 кг")
            // Шукаємо цифри, після яких йде "кг"
            const weightMatch = rawName.match(/(\d+[.,]\d+)\s*кг/i);
            let weightPerBox = 1;
            if (weightMatch) {
                weightPerBox = parseFloat(weightMatch[1].replace(',', '.'));
            }

            // 2. Кількість ящиків
            const boxesQty = parseFloat(boxesCell?.content?.replace(',', '.') || "0") || 0;

            // 3. Рахуємо загальну кількість (кг) = ящики * вага одного ящика
            const totalWeight = boxesQty * weightPerBox;

            // 4. Ціна за кг
            const priceUAH = parseFloat(priceCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0;

            if (totalWeight > 0 && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: totalWeight, // Записуємо сумарну вагу в кг
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'BOX',
                    boxSize: weightPerBox // Зберігаємо вагу ящика для довідки
                });
            }
        });

        return items;
    }

    /**Агент 10 -Джерельна  */
    private parseForAgent10(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 10] Парсинг накладної Джерельна`);
        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) return items;

        const table = result.tables[0];
        const rows = new Map<number, any[]>();

        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // Шукаємо номер рядка в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Якщо в першій колонці не число або це заголовок — пропускаємо
            if (isNaN(rowNo)) return;

            // Визначаємо клітинки згідно з вашим запитом:
            // Назва — стовпчик 2 (індекс 2, бо рахуємо від 0: №, ШтрихКод, Товар...)
            // На фото: №(0), ШтрихКод(1), Товар(2), Од(3), Кількість(4), Ціна без(5), Ціна з(6)
            // Враховуючи ваш опис "назва в 3-му, кількість в 5, ціна в 7":
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 6); // Ціна з ПДВ

            if (!nameCell || !qtyCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості (напр. "6.00")
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;

            // Очистка ціни (беремо ціну з ПДВ)
            const priceUAH = parseFloat(priceCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0;

            // Валідація: якщо ціна 0.01 (як у рядку 18), такий товар зазвичай є бонусом або помилкою, 
            // але ми його записуємо, якщо ціна > 0
            if (rawName && quantity > 0 && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100), // в копійках
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 11 -Галичина  */
    private parseForAgent11(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 11] Парсинг накладної Галичина`);
        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) return items;

        const table = result.tables[0];
        const rows = new Map<number, any[]>();

        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        rows.forEach((cells, rowIdx) => {
            // Сортуємо клітинки зліва направо
            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки ("Всього")
            if (isNaN(rowNo)) return;

            // Згідно з вашим запитом:
            // Назва — 2 стовпчик (index 1)
            // Кількість — 4 стовпчик (index 3)
            // Ціна з ПДВ — 5 стовпчик (index 4)
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 4);

            if (!nameCell || !qtyCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості (на фото цілі числа: 4, 6, 2)
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;

            // Очистка ціни (стовпчик "Ціна з ПДВ")
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && quantity > 0 && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100), // зберігаємо в копійках
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

}