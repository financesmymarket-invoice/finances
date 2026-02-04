
// invoice-parser.service.ts
import { Injectable } from '@nestjs/common';
import { AgentInvoiceFormat, UnitType } from 'src/generated/prisma';

export interface RawOcrItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

export interface ParsedInvoiceItem {
    originalProductName: string;  // "мор КАШТАН ЗІ ЛЬВОВА 70г, 32 шт/ящ"
    cleanProductName: string;      // "мор КАШТАН ЗІ ЛЬВОВА 70г"
    unit: UnitType;                // BOX або PIECE
    quantity: number;             // 1 (якщо "1ящ")
    unitsPerBox?: number;          // 32 (витягнуто з "32 шт/ящ")
    purchasePrice: number;        // Ціна за одиницю (ящик або штуку)
    purchasePricePerPiece?: number; // Якщо unit=BOX, то ціна за штуку
}

@Injectable()
export class InvoiceParserService {
    /**
     * Парсить позиції накладної відповідно до формату агента
     */
    parseItems(
        rawItems: RawOcrItem[],
        agentFormat: AgentInvoiceFormat,
        agentConfig?: {
            boxPattern?: string;
            unitsPerBoxPattern?: string;
        }
    ): ParsedInvoiceItem[] {
        console.log(`\n🔄 [PARSER] Парсинг ${rawItems.length} позицій, формат: ${agentFormat}`);

        switch (agentFormat) {
            case AgentInvoiceFormat.BOX_IN_QTY:
                return this.parseBoxInQtyFormat(rawItems, agentConfig);
            case AgentInvoiceFormat.STANDARD:
                return this.parseStandardFormat(rawItems);
            default:
                console.warn(`⚠️ [PARSER] Невідомий формат ${agentFormat}, використовую STANDARD`);
                return this.parseStandardFormat(rawItems);
        }
    }

    /**
     * Парсинг для агента ID=4 (BOX_IN_QTY формат)
     * Приклад: "мор КАШТАН ЗІ ЛЬВОВА 70г, 32 шт/ящ" - quantity: "1ящ", price: 500
     */
    private parseBoxInQtyFormat(
        rawItems: RawOcrItem[],
        config?: {
            boxPattern?: string;
            unitsPerBoxPattern?: string;
        }
    ): ParsedInvoiceItem[] {
        console.log(`📦 [PARSER] Використовую BOX_IN_QTY формат (агент ID=4)`);

        const unitsPerBoxRegex = config?.unitsPerBoxPattern
            ? new RegExp(config.unitsPerBoxPattern, 'i')
            : /(\d+)\s*шт\/ящ/i;

        const parsedItems: ParsedInvoiceItem[] = [];

        for (let i = 0; i < rawItems.length; i++) {
            const item = rawItems[i];
            console.log(`\n--- [PARSER] Позиція ${i + 1}/${rawItems.length} ---`);
            console.log(`   Оригінальна назва: ${item.productName}`);
            console.log(`   Quantity OCR: ${item.quantity}`);
            console.log(`   UnitPrice OCR: ${item.unitPrice}`);

            // 1. Витягуємо кількість штук в ящику з назви
            const unitsPerBoxMatch = item.productName.match(unitsPerBoxRegex);
            const unitsPerBox = unitsPerBoxMatch ? parseInt(unitsPerBoxMatch[1]) : null;

            if (unitsPerBox) {
                console.log(`   ✅ Знайдено: ${unitsPerBox} шт/ящ`);
            } else {
                console.log(`   ⚠️ Не знайдено "шт/ящ" в назві`);
            }

            // 2. Очищаємо назву від "32 шт/ящ"
            const cleanProductName = item.productName
                .replace(/,?\s*\d+\s*шт\/ящ/gi, '')
                .trim();

            console.log(`   Очищена назва: ${cleanProductName}`);

            // 3. Визначаємо одиницю вимірювання
            // Якщо в назві є "шт/ящ", то це точно ящик
            const unit = unitsPerBox ? UnitType.BOX : UnitType.PIECE;
            console.log(`   Одиниця: ${unit}`);

            // 4. Кількість - це кількість ящиків (або штук якщо не знайдено шт/ящ)
            const quantity = Math.abs(item.quantity);
            console.log(`   Кількість: ${quantity}`);

            // 5. Ціна за ящик
            const purchasePrice = item.unitPrice;
            console.log(`   Ціна за ${unit === UnitType.BOX ? 'ящик' : 'штуку'}: ${purchasePrice}`);

            // 6. Якщо це ящик, обчислюємо ціну за штуку
            let purchasePricePerPiece: number | undefined;
            if (unit === UnitType.BOX && unitsPerBox) {
                purchasePricePerPiece = purchasePrice / unitsPerBox;
                console.log(`   Ціна за штуку: ${purchasePricePerPiece} (${purchasePrice} / ${unitsPerBox})`);
            }

            parsedItems.push({
                originalProductName: item.productName,
                cleanProductName,
                unit,
                quantity,
                unitsPerBox: unitsPerBox || undefined,
                purchasePrice,
                purchasePricePerPiece,
            });
        }

        console.log(`\n✅ [PARSER] Розпарсено ${parsedItems.length} позицій у форматі BOX_IN_QTY`);
        return this.filterJunkItems(parsedItems);
    }

    /**
     * Стандартний парсинг (кількість в штуках)
     */
    private parseStandardFormat(rawItems: RawOcrItem[]): ParsedInvoiceItem[] {
        console.log(`📝 [PARSER] Використовую STANDARD формат`);

        const parsedItems: ParsedInvoiceItem[] = rawItems.map((item, i) => {
            console.log(`\n--- [PARSER] Позиція ${i + 1}/${rawItems.length} ---`);
            console.log(`   Назва: ${item.productName}`);
            console.log(`   Кількість: ${item.quantity}`);
            console.log(`   Ціна: ${item.unitPrice}`);

            return {
                originalProductName: item.productName,
                cleanProductName: item.productName.trim(),
                unit: UnitType.PIECE,
                quantity: Math.abs(item.quantity),
                purchasePrice: item.unitPrice,
            };
        });

        console.log(`✅ [PARSER] Розпарсено ${parsedItems.length} позицій у STANDARD форматі`);
        return this.filterJunkItems(parsedItems);
    }

    /**
     * Фільтрує сміття (адреси, телефони, порожні рядки)
     */
    private filterJunkItems(items: ParsedInvoiceItem[]): ParsedInvoiceItem[] {
        console.log(`\n🗑️ [PARSER] Фільтрація сміття...`);

        const addressPatterns = [
            /вул\.?\s+/i,
            /м\.\s+[А-ЯІЇЄҐа-яіїєґ]/i,
            /тел\.?\s+/i,
            /буд\.?\s+/i,
            /№\s*\d/,
            /^\s*$/,  // Порожні рядки
        ];

        const filtered = items.filter((item, index) => {
            // Перевірка на порожню назву
            if (!item.cleanProductName || item.cleanProductName.trim() === '') {
                console.log(`   ❌ Позиція ${index + 1}: порожня назва`);
                return false;
            }

            // Перевірка на сміття
            const isJunk = addressPatterns.some(pattern =>
                pattern.test(item.cleanProductName) || pattern.test(item.originalProductName)
            );

            if (isJunk) {
                console.log(`   ❌ Позиція ${index + 1}: сміття (${item.cleanProductName.substring(0, 30)}...)`);
                return false;
            }

            return true;
        });

        console.log(`✅ [PARSER] Залишилось ${filtered.length} з ${items.length} позицій`);
        console.log(`   Відфільтровано: ${items.length - filtered.length}`);

        return filtered;
    }
}