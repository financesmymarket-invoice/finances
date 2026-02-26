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


        if (agentId) {
            const poller = await this.client.beginAnalyzeDocument('prebuilt-layout', buffer);
            const result = await poller.pollUntilDone();

            if (agentId === 1 || agentId === 20) return this.parseForAgent1(result);
            if (agentId === 2) return this.parseForAgent2(result);
            if (agentId === 3) return this.parseForAgent3(result);
            if (agentId === 4) return this.parseForAgent4(result);
            if (agentId === 5) return this.parseForAgent5(result);
            if (agentId === 6) return this.parseForAgent6(result);
            if (agentId === 9) return this.parseForAgent7(result);
            if (agentId === 10) return this.parseForAgent10(result);
            if (agentId === 11) return this.parseForAgent11(result);
            if (agentId === 12) return this.parseForAgent12(result);
            if (agentId === 14) return this.parseForAgent14(result);
            if (agentId === 15 || agentId === 16 || agentId === 19) return this.parseForAgent15(result);
            if (agentId === 17) return this.parseForAgent17(result);
            if (agentId === 18) return this.parseForAgent18(result);
            if (agentId === 21) return this.parseForAgent21(result);
            if (agentId === 22) return this.parseForAgent22(result);
            if (agentId === 23) return this.parseForAgent23(result);
            if (agentId === 24) return this.parseForAgent24(result);
            if (agentId === 25) return this.parseForAgent25(result);
            if (agentId === 28 || agentId === 35) return this.parseForAgent28(result);
            if (agentId === 30) return this.parseForAgent30(result);
            if (agentId === 31 || agentId === 32) return this.parseForAgent31(result);
            if (agentId === 33) return this.parseForAgent33(result);
            if (agentId === 34) return this.parseForAgent34(result);
            if (agentId === 36) return this.parseForAgent36(result);
            if (agentId === 37) return this.parseForAgent37(result);
            if (agentId === 38) return this.parseForAgent38(result);
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


    /**Агент 1 - Молокія -- Агент 20 - Немирів */
    private parseForAgent1(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 1] Парсинг накладної Молокія`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Таблиця має ${table.rowCount} рядків і ${table.columnCount} колонок`);

        // Групуємо комірки за рядками
        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        console.log(`\n📊 Всього рядків у таблиці: ${table.rowCount}`);
        console.log(`📊 Рядків у Map: ${rows.size}`);

        for (let rowIdx = 0; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);

            console.log(`\n═══════════════════════════════════════`);
            console.log(`🔍 [ROW ${rowIdx}] Кількість комірок: ${cells?.length || 0}`);

            if (!cells) {
                console.log(`⚠️ [ROW ${rowIdx}] Рядок відсутній у Map`);
                continue;
            }

            // Сортуємо по колонках
            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // Виводимо всі комірки
            console.log(`📋 Всі комірки в рядку ${rowIdx}:`);
            cells.forEach(cell => {
                console.log(`  [col ${cell.columnIndex}]: "${cell.content?.trim().substring(0, 50)}..."`);
            });

            // Пропускаємо заголовок (рядок 0)
            if (rowIdx === 0) {
                console.log(`⚠️ [SKIP] Це заголовок`);
                continue;
            }

            // Беремо колонки за індексами
            const rawName = cells.find(c => c.columnIndex === 2)?.content?.trim() || '';
            const qtyStr = cells.find(c => c.columnIndex === 3)?.content?.trim() || '';
            const priceStr = cells.find(c => c.columnIndex === 5)?.content?.trim() || '';

            // Очищення назви
            let productName = rawName.replace(/:\s*(selected|unselected)\s*:/gi, '')
                .replace(/\n/g, ' ')
                .trim();

            // Пропускаємо рядки без назви
            if (!productName || productName.length < 3) {
                console.warn(`⚠️ [SKIP] Назва занадто коротка: "${rawName}"`);
                continue;
            }

            // Кількість
            const quantity = Number(qtyStr.replace(/[^\d]/g, '')) || 0;
            if (quantity <= 0) {
                console.warn(`⚠️ [SKIP] Некоректна кількість: "${qtyStr}" → ${quantity}`);
                continue;
            }

            // Ціна
            const priceUAH = parseFloat(priceStr.replace(',', '.')) || 0;
            if (priceUAH <= 0) {
                console.warn(`⚠️ [SKIP] Некоректна ціна: "${priceStr}" → ${priceUAH}`);
                continue;
            }

            const purchasePrice = Math.round(priceUAH * 100);

            console.log(`✅ ДОДАЄМО: "${productName}" × ${quantity} шт @ ${purchasePrice}коп`);

            items.push({
                productName,
                quantity,
                purchasePrice,
                unitType: 'PIECE',
            });
        }

        console.log(`\n═══════════════════════════════════════`);
        console.log(`✅ Агент 1: витягнуто ${items.length} позицій з ${table.rowCount} рядків`);
        items.forEach((item, idx) => {
            console.log(`  ${idx + 1}. ${item.productName} - ${item.quantity} шт`);
        });

        return items;
    }

  
    /** Агент 2 - Перша Приватна  */
    private parseForAgent2(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 2] Парсинг таблиці`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Знайдено таблицю: ${table.rowCount} рядків, ${table.columnCount} колонок`);

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        // Починаємо з рядка 1 (пропускаємо заголовок)
        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            console.log(`\n🔍 Рядок ${rowIdx} (${cells.length} клітинок):`);
            cells.forEach((cell, idx) => {
                console.log(`  [${idx}] col=${cell.columnIndex}: "${cell.content?.trim()}"`);
            });

            // Структура таблиці Перша Приватна Броварська:
            // col 0: № (номер позиції)
            // col 1: Назва товару
            // col 2: Кількість
            // col 3: Одиниця виміру (шт/пл/ящ)
            // col 4: Ціна закупівельна
            // col 5: Сума
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 2);
            const unitCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 4);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawUnit = unitCell?.content?.trim() ?? '';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            console.log(`  📝 Назва: "${rawName}"`);
            console.log(`  🔢 Кількість: "${rawQty}"`);
            console.log(`  📦 Одиниця: "${rawUnit}"`);
            console.log(`  💰 Ціна: "${rawPrice}"`);

            // Пропускаємо порожні рядки
            if (!rawName || rawName.length < 5) {
                console.log(`  ⏭️ Пропуск: порожня/коротка назва`);
                continue;
            }

            // Очищення назви
            rawName = rawName
                .replace(/:\s*(selected|unselected)\s*:?/gi, '')
                .replace(/ФІЗИЧНА ОСОБА|ПІДПРИЄМЕЦЬ|ГОРИНСЬКИЙ|ДЛЯ ДОКУМЕНТІВ|Ігор Іванович/gi, '')
                .replace(/\n+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            // Перевіряємо чи не заголовок це
            if (/^(№|n|назва|товар|к-?ть|кількість|од\.|одиниця|ціна)/i.test(rawName)) {
                console.log(`  ⏭️ Пропуск: заголовок`);
                continue;
            }

            // Парсинг кількості
            const quantity = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (quantity <= 0) {
                console.log(`  ⏭️ Пропуск: нульова кількість`);
                continue;
            }

            // Парсинг ціни
            const cleanPrice = rawPrice.replace(/\s+/g, '').replace(/,/g, '.');
            const priceMatch = cleanPrice.match(/(\d+(?:\.\d{1,2})?)/);
            const priceUAH = priceMatch ? parseFloat(priceMatch[1]) : 0;

            if (priceUAH <= 0) {
                console.log(`  ⏭️ Пропуск: нульова ціна`);
                continue;
            }

            const purchasePriceCents = Math.round(priceUAH * 100);

            // Визначення типу упаковки
            // "пл", "ПЛЯШ" - це пляшки (штуки)
            // "шт" - штуки
            // "ящ" - ящики
            const isBox = /ящ|яш/i.test(rawUnit);
            const unitType: 'PIECE' | 'BOX' = isBox ? 'BOX' : 'PIECE';

            let boxSize: number | undefined = undefined;

            if (isBox) {
                // Шукаємо розмір ящика в назві: "6пл", "12шт", "24шт"
                const boxSizeMatch = rawName.match(/(\d+)\s*(шт|пл|пляш)/i);
                if (boxSizeMatch) {
                    boxSize = parseInt(boxSizeMatch[1], 10);
                    console.log(`  ✓ Розмір ящика: ${boxSize} шт`);
                }
            }

            const item: ParsedInvoiceItemInternal = {
                productName: rawName,
                quantity: quantity,
                purchasePrice: purchasePriceCents,
                unitType,
                boxSize: unitType === 'BOX' ? boxSize : undefined,
            };

            console.log(`  ✅ ДОДАНО:`, item);
            items.push(item);
        }

        console.log(`\n✅ Всього розпізнано позицій: ${items.length}`);
        return items;
    }

    /**Агент 3 -Радимо  */
    private parseForAgent3(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 3] Парсинг накладної`);
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

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — col 2 (Товар)
            // Кількість — col 3 (Кількість)
            // Ціна з ПДВ — col 5 (Ціна з ПДВ)
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }


    /**Агент 4 Лімо */
    /**Агент 4 Лімо */
    private parseForAgent4(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 4] Парсинг таблиці`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Знайдено таблицю: ${table.rowCount} рядків, ${table.columnCount} колонок`);

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        // Починаємо з рядка 1 (пропускаємо заголовок)
        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // Структура таблиці:
            // col 1: Товар (назва)
            // col 2: К-сть
            // col 3: Одиниця (шт/ящ)
            // col 4: Ціна
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 2);
            const unitCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 4);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawUnit = unitCell?.content?.trim() ?? '';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            console.log(`\n🔍 Рядок ${rowIdx}:`);
            console.log(`  📝 Назва: "${rawName}"`);
            console.log(`  🔢 Кількість: "${rawQty}"`);
            console.log(`  📦 Одиниця: "${rawUnit}"`);
            console.log(`  💰 Ціна: "${rawPrice}"`);

            // Пропускаємо порожні рядки
            if (!rawName || rawName.length < 3) {
                console.log(`  ⏭️ Пропуск: порожня назва`);
                continue;
            }

            // Очищення назви
            rawName = rawName
                .replace(/:\s*(selected|unselected)\s*:?/gi, '')
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            // Парсинг кількості з таблиці
            const tableQty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (tableQty <= 0) {
                console.log(`  ⏭️ Пропуск: нульова кількість`);
                continue;
            }

            // Парсинг ціни
            const cleanPrice = rawPrice.replace(/\s+/g, '').replace(/,/g, '.');
            const priceMatch = cleanPrice.match(/(\d+(?:\.\d{1,2})?)/);
            const priceUAH = priceMatch ? parseFloat(priceMatch[1]) : 0;

            if (priceUAH <= 0) {
                console.log(`  ⏭️ Пропуск: нульова ціна`);
                continue;
            }

            // Визначення типу упаковки
            const isBox = /ящ|яш/i.test(rawUnit);
            const unitType: 'PIECE' | 'BOX' = isBox ? 'BOX' : 'PIECE';

            let boxSize: number | undefined = undefined;
            let finalQuantity: number;
            let purchasePriceCents: number;

            if (isBox) {
                // 📦 ЯЩИК: ціна в таблиці = ціна за ЯЩИК
                console.log(`  📦 Тип: ЯЩИК`);

                // Шукаємо розмір ящика в назві
                const boxSizeMatch = rawName.match(/(\d+)\s*шт[\s\/]*ящ/i);

                if (boxSizeMatch) {
                    boxSize = parseInt(boxSizeMatch[1], 10);
                    console.log(`  ✓ Розмір ящика: ${boxSize} шт`);
                } else {
                    // Якщо не знайдено, шукаємо вагу
                    const weightMatch = rawName.match(/(\d+(?:[,.]\d+)?)\s*кг/i);

                    if (weightMatch) {
                        const kgValue = parseFloat(weightMatch[1].replace(',', '.'));

                        if (/пельмен|хінкал|млинц/i.test(rawName)) {
                            boxSize = Math.round(kgValue);
                        } else {
                            const pieceWeightMatch = rawName.match(/(\d+)\s*г/i);
                            if (pieceWeightMatch) {
                                const gramsPerPiece = parseInt(pieceWeightMatch[1]);
                                boxSize = Math.round((kgValue * 1000) / gramsPerPiece);
                            } else {
                                boxSize = 20;
                            }
                        }
                        console.log(`  ✓ Розмір з ваги: ${boxSize} шт`);
                    }
                }

                if (!boxSize || boxSize <= 0) {
                    boxSize = 20;
                    console.log(`  ⚠️ Default: ${boxSize} шт`);
                }

                // Кількість штук = к-сть ящиків × розмір ящика
                finalQuantity = tableQty * boxSize;
                // Ціна зберігаємо ЯК Є (за ящик)
                purchasePriceCents = Math.round(priceUAH * 100);

                console.log(`  📊 Розрахунок:`);
                console.log(`     К-сть ящиків: ${tableQty}`);
                console.log(`     Розмір ящика: ${boxSize} шт`);
                console.log(`     Всього штук: ${finalQuantity}`);
                console.log(`     Ціна за ящик: ${priceUAH} грн (${purchasePriceCents} коп)`);

            } else {
                // 📦 ШТУКИ: ціна в таблиці = ціна за ШТУКУ
                console.log(`  📦 Тип: ШТУКИ`);

                finalQuantity = tableQty;
                purchasePriceCents = Math.round(priceUAH * 100);

                console.log(`  📊 Розрахунок:`);
                console.log(`     Кількість: ${finalQuantity} шт`);
                console.log(`     Ціна за штуку: ${priceUAH} грн (${purchasePriceCents} коп)`);
            }

            // Очищаємо назву від технічної інформації
            const cleanName = rawName
                .replace(/,?\s*\d+\s*шт[\s\/]*ящ/gi, '')
                .replace(/\s*ящ\.?\s*$/gi, '')
                .trim();

            const item: ParsedInvoiceItemInternal = {
                productName: cleanName,
                quantity: finalQuantity,  // загальна кількість ШТУК
                purchasePrice: purchasePriceCents,  // ціна ЯК Є (за ящик або штуку)
                unitType,
                boxSize: unitType === 'BOX' ? boxSize : undefined,
            };

            console.log(`  ✅ ДОДАНО:`, item);
            items.push(item);
        }

        console.log(`\n✅ Всього розпізнано позицій: ${items.length}`);
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
                quantity: qty / 1000,
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

        for (let rowIdx = 0; rowIdx < table.rowCount; rowIdx++) {
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

            let qty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (qty <= 0) qty = 1;

            const cleanPrice = rawPrice.replace(',', '.');
            const priceMatch = cleanPrice.match(/(\d+)\.?(\d{0,2})/);
            const priceUAH = priceMatch
                ? parseFloat(`${priceMatch[1]}.${priceMatch[2] || '00'}`)
                : 0;

            if (priceUAH <= 0) continue;

            const priceCents = Math.round(priceUAH * 100);

            // Очищаємо назву від зайвих позначок
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

    /**Агент 12 -Живчик  */
    private parseForAgent12(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 12] Парсинг накладної`);
        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) return items;

        const table = result.tables[0];

        // ДІАГНОСТИКА: виводимо структуру таблиці
        console.log(`\n🔍 [DEBUG] Таблиця має ${table.rowCount} рядків і ${table.columnCount} стовпців`);

        const rows = new Map<number, any[]>();

        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // ДІАГНОСТИКА: виводимо перші 2 рядки повністю
            if (rowIdx <= 2) {
                console.log(`\n🔍 [DEBUG] Рядок ${rowIdx}:`);
                cells.forEach(cell => {
                    console.log(`  col ${cell.columnIndex}: "${cell.content}"`);
                });
            }

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — 3 стовпчик (index 2)
            // Кількість — 4 стовпчик (index 3)
            // Ціна з ПДВ — 6 стовпчик (index 5)
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);

            if (!nameCell || !qtyCell || !priceCell) {
                console.log(`⚠️ [DEBUG] Рядок ${rowIdx}: відсутні клітинки - name=${!!nameCell}, qty=${!!qtyCell}, price=${!!priceCell}`);
                return;
            }

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // ДІАГНОСТИКА: виводимо що парсимо
            console.log(`\n✅ [DEBUG] Рядок ${rowIdx}: name="${rawName}", qty="${qtyCell.content}", price="${priceCell.content}"`);

            // Очистка кількості
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;

            // Очистка ціни (ціна з ПДВ)
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && quantity > 0 && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        console.log(`\n📦 [DEBUG] Всього оброблено товарів: ${items.length}`);
        return items;
    }

    /**Агент 14  Хортиця*/
    private parseForAgent14(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 14] Парсинг накладної`);
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

            // Назва — col 0 (Найменування)
            // Кількість — col 5 (Кількість)
            // Ціна — col 7 (Ціна зі знижкою)
            const nameCell = cells.find(c => c.columnIndex === 0);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 7);

            if (!nameCell || !qtyCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Пропускаємо заголовки
            if (/найменування|штрих-код|назва/i.test(rawName)) return;

            // Очистка кількості
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && quantity > 0 && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }
    /**Агент 15 Enjoy --- Tonja*/
    private parseForAgent15(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 15] Парсинг таблиці`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Знайдено таблицю: ${table.rowCount} рядків, ${table.columnCount} колонок`);

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        // Починаємо з рядка 1 (пропускаємо заголовок на рядку 0)
        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            console.log(`\n🔍 Рядок ${rowIdx} (${cells.length} клітинок):`);
            cells.forEach((cell, idx) => {
                console.log(`  [${idx}] col=${cell.columnIndex}: "${cell.content?.trim()}"`);
            });

            // Структура таблиці Enjoy/Tonja:
            // col 0: №
            // col 1: Штрихкод
            // col 2: Номенклатура (назва товару)
            // col 3: Од. (кг/шт)
            // col 4: К-сть
            // col 5: Ціна
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            console.log(`  📝 Назва: "${rawName}"`);
            console.log(`  🔢 Кількість: "${rawQty}"`);
            console.log(`  💰 Ціна: "${rawPrice}"`);

            // Пропускаємо заголовки та порожні рядки
            if (!rawName || rawName.length < 5) {
                console.log(`  ⏭️ Пропуск: порожня/коротка назва`);
                continue;
            }

            if (/номенклатура|штрихкод|найменування|к-?ть|ціна/i.test(rawName)) {
                console.log(`  ⏭️ Пропуск: заголовок`);
                continue;
            }

            // Очищення назви
            rawName = rawName
                .replace(/\n+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            // Парсинг кількості
            const quantity = parseFloat(rawQty.replace(/,/g, '.')) || 0;
            if (quantity <= 0) {
                console.log(`  ⏭️ Пропуск: нульова кількість`);
                continue;
            }

            // Парсинг ціни
            const cleanPrice = rawPrice.replace(/\s+/g, '').replace(/,/g, '.');
            const priceMatch = cleanPrice.match(/(\d+(?:\.\d{1,2})?)/);
            const priceUAH = priceMatch ? parseFloat(priceMatch[1]) : 0;

            if (priceUAH <= 0) {
                console.log(`  ⏭️ Пропуск: нульова ціна`);
                continue;
            }

            const purchasePriceCents = Math.round(priceUAH * 100);

            const item: ParsedInvoiceItemInternal = {
                productName: rawName,
                quantity: quantity,
                purchasePrice: purchasePriceCents,
                unitType: 'PIECE',
            };

            console.log(`  ✅ ДОДАНО:`, item);
            items.push(item);
        }

        console.log(`\n✅ Всього розпізнано позицій: ${items.length}`);
        return items;
    }


    /**Агент 17  -- Агробізнес*/
    private parseForAgent17(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 17] Парсинг накладної`);
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

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — col 1 (Назва товару)
            // Кількість — col 6 (К-СТЬ)
            // Ціна — col 7 (ціна)
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 6);
            const priceCell = cells.find(c => c.columnIndex === 7);

            if (!nameCell || !qtyCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && quantity > 0 && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 18  Venzar*/
    private parseForAgent18(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 18] Парсинг накладної`);
        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];

        // ДІАГНОСТИКА: виводимо структуру таблиці
        console.log(`\n🔍 [DEBUG] Таблиця має ${table.rowCount} рядків і ${table.columnCount} стовпців`);

        const rows = new Map<number, any[]>();

        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            // ДІАГНОСТИКА: виводимо перші 5 рядків повністю
            if (rowIdx <= 5) {
                console.log(`\n🔍 [DEBUG] Рядок ${rowIdx}:`);
                cells.forEach(cell => {
                    console.log(`  col ${cell.columnIndex}: "${cell.content}"`);
                });
            }

            // Назва — col 1 (Товар)
            // Кількість — col 2 (К-сть)
            // Ціна — col 3 (Ціна)
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 2);
            const priceCell = cells.find(c => c.columnIndex === 3);

            if (!nameCell || !priceCell) {
                if (rowIdx <= 8) {
                    console.log(`⚠️ [DEBUG] Рядок ${rowIdx}: відсутні клітинки - name=${!!nameCell}, qty=${!!qtyCell}, price=${!!priceCell}`);
                }
                return;
            }

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // ДІАГНОСТИКА: виводимо що парсимо
            if (rowIdx <= 8) {
                console.log(`\n✅ [DEBUG] Рядок ${rowIdx}: name="${rawName}", qty="${qtyCell?.content}", price="${priceCell.content}"`);
            }

            // Пропускаємо заголовки
            if (/товар|к-сть|ціна|всього/i.test(rawName)) return;

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        console.log(`\n📦 [DEBUG] Всього оброблено товарів: ${items.length}`);
        return items;
    }

    /**Агент 21  Козацька рада*/
    private parseForAgent21(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 21] Парсинг накладної`);
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

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — col 2 (Найменування товару)
            // Кількість — col 3 (Кільк.)
            // Ціна — col 4 (Вартість за одиницю товару з ПДВ)
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 4);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 22  Овація*/
    private parseForAgent22(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 22] Парсинг накладної`);
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

            // Назва — col 4 (Найменування товару)
            // Кількість — col 6 (Кількість)
            // Ціна — col 7 (Ціна з ПДВ)
            const nameCell = cells.find(c => c.columnIndex === 4);
            const qtyCell = cells.find(c => c.columnIndex === 6);
            const priceCell = cells.find(c => c.columnIndex === 7);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Пропускаємо заголовки
            if (/найменування|товар|код|штрих/i.test(rawName)) return;

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 23  Руна*/
    private parseForAgent23(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 23] Парсинг накладної`);
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

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — col 3 (Товар)
            // Кількість — col 5 (Кіл-ть)
            // Ціна — col 8 (Ціна з ПДВ)
            const nameCell = cells.find(c => c.columnIndex === 3);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 8);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості (якщо немає або 0 - ставимо  1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 24 Медов*/
    private parseForAgent24(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 24] Парсинг накладної`);
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

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — col 4 (5-й стовпчик)
            // Кількість — col 5 (6-й стовпчик)
            // Ціна — col 8 (9-й стовпчик)
            const nameCell = cells.find(c => c.columnIndex === 4);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 8);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 25  Кулиничі*/
    private parseForAgent25(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 25] Парсинг накладної`);
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

            // Назва — col 2 (3-й стовпчик)
            // Кількість — col 4 (5-й стовпчик)
            // Ціна — col 12 (13-й стовпчик)
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 12);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Пропускаємо заголовки та рядки з цифрами замість назв
            if (/найменування|сорт|марка|код|^\d+$/i.test(rawName)) return;

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 28  Добрий вечір*/
    private parseForAgent28(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 27] Парсинг накладної`);
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

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — col 1 (2-й стовпчик)
            // Вага — col 2 (3-й стовпчик)
            // Кількість ящиків — col 3 (4-й стовпчик)
            // Ціна — col 5 (6-й стовпчик)
            const nameCell = cells.find(c => c.columnIndex === 1);
            const weightCell = cells.find(c => c.columnIndex === 2);
            const boxesCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка ваги
            const weight = weightCell ? (parseFloat(weightCell.content.replace(',', '.')) || 0) : 0;

            // Очистка кількості ящиків
            const boxes = boxesCell ? (parseFloat(boxesCell.content.replace(',', '.')) || 0) : 0;

            // Рахуємо загальну кількість = вага × ящики
            let quantity = weight * boxes;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 30  Світоч*/
    private parseForAgent30(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 30] Парсинг накладної`);
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
            // Назва — col 1 (Назва товару)
            // Кількість — col 6 (Кільк.)
            // Ціна — col 7 (Ціна)
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 6);
            const priceCell = cells.find(c => c.columnIndex === 7);
            if (!nameCell || !priceCell) return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            // Пропускаємо тільки заголовки
            if (/^назва\s*$/i.test(rawName) || /штрихкод|^упак\.|^сума$|^ціна$/i.test(rawName)) return;
            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0) : 0;
            if (quantity <= 0) quantity = 1;
            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;
            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });
        return items;
    }

    /**Агент 31  Мяу*/
    private parseForAgent31(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 30] Парсинг накладної`);
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
            // Назва — col 1 (Назва товару)
            // Кількість — col 6 (Кільк.)
            // Ціна — col 7 (Ціна)
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 6);
            if (!nameCell || !priceCell) return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            // Пропускаємо тільки заголовки
            if (/^назва\s*$/i.test(rawName) || /штрихкод|^упак\.|^сума$|^ціна$/i.test(rawName)) return;
            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0) : 0;
            if (quantity <= 0) quantity = 1;
            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;
            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });
        return items;
    }

    /**Агент 33 Сигарети дешеві*/
    private parseForAgent33(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 33] Парсинг накладної`);
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

            // Перевіряємо наявність порядкового номера в першій колонці (col 0)
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");

            // Пропускаємо заголовки та підсумкові рядки
            if (isNaN(rowNo)) return;

            // Назва — col 2 (3-й стовпчик: Номенклатура)
            // МРЦ — col 4 (5-й стовпчик: МРЦ - ціна)
            // Кількість — col 5 (6-й стовпчик: Кільк-кість)
            const nameCell = cells.find(c => c.columnIndex === 2);
            const priceCell = cells.find(c => c.columnIndex === 4);
            const qtyCell = cells.find(c => c.columnIndex === 5);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 34 Роман */
    private parseForAgent34(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 34] Парсинг накладної`);
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

            // Назва — col 2 (3-й стовпчик: Товар)
            // Кількість — col 3 (4-й стовпчик: Кількість)
            // Ціна — col 5 (6-й стовпчик: Ціна)
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);

            if (!nameCell || !priceCell) return;

            let rawName = nameCell.content.replace(/\n/g, ' ').trim();

            // Пропускаємо заголовки
            if (/^товар$|^код$|^сума$|^ціна$|^кількість$/i.test(rawName)) return;

            // Очистка кількості (якщо немає або 0 - ставимо 1)
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0) : 0;
            if (quantity <= 0) quantity = 1;

            // Очистка ціни
            const rawPrice = priceCell.content.replace(',', '.').replace(/[^\d.]/g, '');
            const priceUAH = parseFloat(rawPrice) || 0;

            if (rawName && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: quantity,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'PIECE'
                });
            }
        });

        return items;
    }

    /**Агент 36 - Наш Сік */
    private parseForAgent36(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 36] Парсинг таблиці`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Знайдено таблицю: ${table.rowCount} рядків, ${table.columnCount} колонок`);

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        // Починаємо з рядка 1 (пропускаємо заголовок)
        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            console.log(`\n🔍 Рядок ${rowIdx} (${cells.length} клітинок):`);
            cells.forEach((cell, idx) => {
                console.log(`  [${idx}] col=${cell.columnIndex}: "${cell.content?.trim()}"`);
            });

            // Структура таблиці Чудо-Чадо:
            // col 0: Назва товару
            // col 1: К-ть упак (можливо пусто або рукописне)
            // col 2: К-ть один. (можливо пусто)
            // col 3: Ціна
            // col 4: Варт. з ПДВ
            const nameCell = cells.find(c => c.columnIndex === 0);
            const qtyCell1 = cells.find(c => c.columnIndex === 1); // К-ть упак
            const qtyCell2 = cells.find(c => c.columnIndex === 2); // К-ть один.
            const priceCell = cells.find(c => c.columnIndex === 3);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty1 = qtyCell1?.content?.trim() ?? '';
            const rawQty2 = qtyCell2?.content?.trim() ?? '';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            console.log(`  📝 Назва: "${rawName}"`);
            console.log(`  🔢 К-ть упак: "${rawQty1}"`);
            console.log(`  🔢 К-ть один: "${rawQty2}"`);
            console.log(`  💰 Ціна: "${rawPrice}"`);

            // Пропускаємо порожні рядки
            if (!rawName || rawName.length < 5) {
                console.log(`  ⏭️ Пропуск: порожня/коротка назва`);
                continue;
            }

            // Очищення назви
            rawName = rawName
                .replace(/\n+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            // Перевіряємо чи не заголовок
            if (/^(назва|товар|к-?ть|ціна|варт)/i.test(rawName)) {
                console.log(`  ⏭️ Пропуск: заголовок`);
                continue;
            }

            // Парсинг кількості - беремо з "К-ть один." (col 2)
            // Якщо порожнє - беремо з "К-ть упак" (col 1)
            let quantity = 0;

            if (rawQty2) {
                quantity = parseFloat(rawQty2.replace(/,/g, '.').replace(/[^\d.]/g, '')) || 0;
                console.log(`  ✓ Кількість з col 2: ${quantity}`);
            }

            if (quantity <= 0 && rawQty1) {
                quantity = parseFloat(rawQty1.replace(/,/g, '.').replace(/[^\d.]/g, '')) || 0;
                console.log(`  ✓ Кількість з col 1: ${quantity}`);
            }

            if (quantity <= 0) {
                console.log(`  ⏭️ Пропуск: нульова кількість`);
                continue;
            }

            // Парсинг ціни
            const cleanPrice = rawPrice.replace(/\s+/g, '').replace(/,/g, '.');
            const priceMatch = cleanPrice.match(/(\d+(?:\.\d{1,3})?)/);
            const priceUAH = priceMatch ? parseFloat(priceMatch[1]) : 0;

            if (priceUAH <= 0) {
                console.log(`  ⏭️ Пропуск: нульова ціна`);
                continue;
            }

            const purchasePriceCents = Math.round(priceUAH * 100);

            const item: ParsedInvoiceItemInternal = {
                productName: rawName,
                quantity: quantity,
                purchasePrice: purchasePriceCents,
                unitType: 'PIECE',
            };

            console.log(`  ✅ ДОДАНО:`, item);
            items.push(item);
        }

        console.log(`\n✅ Всього розпізнано позицій: ${items.length}`);
        return items;
    }

    /**Агент 37 - Пиво Гараж */
    private parseForAgent37(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 37] Парсинг таблиці`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Знайдено таблицю: ${table.rowCount} рядків, ${table.columnCount} колонок`);

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        // Починаємо з рядка 1 (пропускаємо заголовок)
        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            console.log(`\n🔍 Рядок ${rowIdx} (${cells.length} клітинок):`);
            cells.forEach((cell, idx) => {
                console.log(`  [${idx}] col=${cell.columnIndex}: "${cell.content?.trim()}"`);
            });

            // Структура таблиці Пиво Гараж:
            // col 0: №
            // col 1: Штрих код
            // col 2: Товар / тара (назва товару)
            // col 3: Кількість
            // col 4: Одиниця (шт)
            // col 5: Ціна з ПДВ
            // col 6: Сума з ПДВ
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const unitCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5);
            const sumCell = cells.find(c => c.columnIndex === 6);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawUnit = unitCell?.content?.trim() ?? '';
            const rawPrice = priceCell?.content?.trim() ?? '0';
            const rawSum = sumCell?.content?.trim() ?? '0';

            console.log(`  📝 Назва: "${rawName}"`);
            console.log(`  🔢 Кількість: "${rawQty}"`);
            console.log(`  📦 Одиниця: "${rawUnit}"`);
            console.log(`  💰 Ціна: "${rawPrice}"`);
            console.log(`  💵 Сума: "${rawSum}"`);

            // Пропускаємо порожні рядки
            if (!rawName || rawName.length < 5) {
                console.log(`  ⏭️ Пропуск: порожня/коротка назва`);
                continue;
            }

            // Очищення назви
            rawName = rawName
                .replace(/\n+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            // Перевіряємо чи не заголовок
            if (/^(товар|тара|назва|к-?ть|кількість|ціна|сума)/i.test(rawName)) {
                console.log(`  ⏭️ Пропуск: заголовок`);
                continue;
            }

            // Пропускаємо підсумкові рядки
            if (/разом|всього|итого/i.test(rawName)) {
                console.log(`  ⏭️ Пропуск: підсумковий рядок`);
                continue;
            }

            // Парсинг кількості
            let quantity = parseFloat(rawQty.replace(/,/g, '.').replace(/[^\d.]/g, '')) || 0;

            // ⚠️ ФІКС: Якщо кількість 0 або дуже мала, спробуємо розрахувати з ціни та суми
            if (quantity <= 0 || quantity < 0.1) {
                const cleanPrice = rawPrice.replace(/\s+/g, '').replace(/,/g, '.');
                const priceMatch = cleanPrice.match(/(\d+(?:\.\d{1,2})?)/);
                const priceUAH = priceMatch ? parseFloat(priceMatch[1]) : 0;

                const cleanSum = rawSum.replace(/\s+/g, '').replace(/,/g, '.');
                const sumMatch = cleanSum.match(/(\d+(?:\.\d{1,2})?)/);
                const sumUAH = sumMatch ? parseFloat(sumMatch[1]) : 0;

                if (priceUAH > 0 && sumUAH > 0) {
                    quantity = Math.round(sumUAH / priceUAH);
                    console.log(`  🔧 Розрахована кількість: ${sumUAH} / ${priceUAH} = ${quantity}`);
                }
            }

            if (quantity <= 0) {
                console.log(`  ⏭️ Пропуск: нульова кількість`);
                continue;
            }

            // Парсинг ціни
            const cleanPrice = rawPrice.replace(/\s+/g, '').replace(/,/g, '.');
            const priceMatch = cleanPrice.match(/(\d+(?:\.\d{1,2})?)/);
            const priceUAH = priceMatch ? parseFloat(priceMatch[1]) : 0;

            if (priceUAH <= 0) {
                console.log(`  ⏭️ Пропуск: нульова ціна`);
                continue;
            }

            const purchasePriceCents = Math.round(priceUAH * 100);

            const item: ParsedInvoiceItemInternal = {
                productName: rawName,
                quantity: quantity,
                purchasePrice: purchasePriceCents,
                unitType: 'PIECE',
            };

            console.log(`  ✅ ДОДАНО:`, item);
            items.push(item);
        }

        console.log(`\n✅ Всього розпізнано позицій: ${items.length}`);
        return items;
    }

    /** Агент 38 - Мономах  */
    private parseForAgent38(result: AnalyzeResult): ParsedInvoiceItemInternal[] {
        console.log(`\n📊 [AGENT 38] Парсинг таблиці`);

        const items: ParsedInvoiceItemInternal[] = [];

        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }

        const table = result.tables[0];
        console.log(`📋 Знайдено таблицю: ${table.rowCount} рядків, ${table.columnCount} колонок`);

        const rows = new Map<number, any[]>();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex)) rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex)!.push(cell);
        }

        // Починаємо з рядка 1 (пропускаємо заголовок)
        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells) continue;

            cells.sort((a, b) => a.columnIndex - b.columnIndex);

            console.log(`\n🔍 Рядок ${rowIdx} (${cells.length} клітинок):`);
            cells.forEach((cell, idx) => {
                console.log(`  [${idx}] col=${cell.columnIndex}: "${cell.content?.trim()}"`);
            });

            // Структура таблиці Агент 38:
            // col 0: №
            // col 1: Штрих код
            // col 2: Назва товару / тара
            // col 3: Кількість
            // col 4: (одиниця виміру - шт і т.д.)
            // col 5: Ціна з ПДВ
            // col 6: Сума з ПДВ
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);

            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '';
            const rawPrice = priceCell?.content?.trim() ?? '0';

            console.log(`  📝 Назва: "${rawName}"`);
            console.log(`  🔢 Кількість: "${rawQty}"`);
            console.log(`  💰 Ціна: "${rawPrice}"`);

            // Пропускаємо порожні / надто короткі рядки
            if (!rawName || rawName.length < 3) {
                console.log(`  ⏭️ Пропуск: порожня/коротка назва`);
                continue;
            }

            // Очищення назви
            rawName = rawName
                .replace(/\n+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

            // Пропускаємо рядки-заголовки або підсумки
            if (/^(назва|товар|тара|к-?ть|ціна|варт|разом|підсумок)/i.test(rawName)) {
                console.log(`  ⏭️ Пропуск: заголовок або підсумок`);
                continue;
            }

            // Парсинг кількості
            const quantity = parseFloat(rawQty.replace(/,/g, '.').replace(/[^\d.]/g, '')) || 0;
            console.log(`  ✓ Кількість: ${quantity}`);

            if (quantity <= 0) {
                console.log(`  ⏭️ Пропуск: нульова кількість`);
                continue;
            }

            // Парсинг ціни
            const cleanPrice = rawPrice.replace(/\s+/g, '').replace(/,/g, '.');
            const priceMatch = cleanPrice.match(/(\d+(?:\.\d{1,3})?)/);
            const priceUAH = priceMatch ? parseFloat(priceMatch[1]) : 0;

            if (priceUAH <= 0) {
                console.log(`  ⏭️ Пропуск: нульова ціна`);
                continue;
            }

            const purchasePriceCents = Math.round(priceUAH * 100);

            const item: ParsedInvoiceItemInternal = {
                productName: rawName,
                quantity: quantity,
                purchasePrice: purchasePriceCents,
                unitType: 'PIECE',
            };

            console.log(`  ✅ ДОДАНО:`, item);
            items.push(item);
        }

        console.log(`\n✅ Всього розпізнано позицій: ${items.length}`);
        return items;
    }
}