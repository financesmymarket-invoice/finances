"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceParserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let InvoiceParserService = class InvoiceParserService {
    parseItems(rawItems, agentFormat, agentConfig) {
        console.log(`\n🔄 [PARSER] Парсинг ${rawItems.length} позицій, формат: ${agentFormat}`);
        switch (agentFormat) {
            case client_1.AgentInvoiceFormat.BOX_IN_QTY:
                return this.parseBoxInQtyFormat(rawItems, agentConfig);
            case client_1.AgentInvoiceFormat.STANDARD:
                return this.parseStandardFormat(rawItems);
            default:
                console.warn(`⚠️ [PARSER] Невідомий формат ${agentFormat}, використовую STANDARD`);
                return this.parseStandardFormat(rawItems);
        }
    }
    parseBoxInQtyFormat(rawItems, config) {
        console.log(`📦 [PARSER] Використовую BOX_IN_QTY формат (агент ID=4)`);
        const unitsPerBoxRegex = config?.unitsPerBoxPattern
            ? new RegExp(config.unitsPerBoxPattern, 'i')
            : /(\d+)\s*шт\/ящ/i;
        const parsedItems = [];
        for (let i = 0; i < rawItems.length; i++) {
            const item = rawItems[i];
            console.log(`\n--- [PARSER] Позиція ${i + 1}/${rawItems.length} ---`);
            console.log(`   Оригінальна назва: ${item.productName}`);
            console.log(`   Quantity OCR: ${item.quantity}`);
            console.log(`   UnitPrice OCR: ${item.unitPrice}`);
            const unitsPerBoxMatch = item.productName.match(unitsPerBoxRegex);
            const unitsPerBox = unitsPerBoxMatch ? parseInt(unitsPerBoxMatch[1]) : null;
            if (unitsPerBox) {
                console.log(`   ✅ Знайдено: ${unitsPerBox} шт/ящ`);
            }
            else {
                console.log(`   ⚠️ Не знайдено "шт/ящ" в назві`);
            }
            const cleanProductName = item.productName
                .replace(/,?\s*\d+\s*шт\/ящ/gi, '')
                .trim();
            console.log(`   Очищена назва: ${cleanProductName}`);
            const unit = unitsPerBox ? client_1.UnitType.BOX : client_1.UnitType.PIECE;
            console.log(`   Одиниця: ${unit}`);
            const quantity = Math.abs(item.quantity);
            console.log(`   Кількість: ${quantity}`);
            const purchasePrice = item.unitPrice;
            console.log(`   Ціна за ${unit === client_1.UnitType.BOX ? 'ящик' : 'штуку'}: ${purchasePrice}`);
            let purchasePricePerPiece;
            if (unit === client_1.UnitType.BOX && unitsPerBox) {
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
    parseStandardFormat(rawItems) {
        console.log(`📝 [PARSER] Використовую STANDARD формат`);
        const parsedItems = rawItems.map((item, i) => {
            console.log(`\n--- [PARSER] Позиція ${i + 1}/${rawItems.length} ---`);
            console.log(`   Назва: ${item.productName}`);
            console.log(`   Кількість: ${item.quantity}`);
            console.log(`   Ціна: ${item.unitPrice}`);
            return {
                originalProductName: item.productName,
                cleanProductName: item.productName.trim(),
                unit: client_1.UnitType.PIECE,
                quantity: Math.abs(item.quantity),
                purchasePrice: item.unitPrice,
            };
        });
        console.log(`✅ [PARSER] Розпарсено ${parsedItems.length} позицій у STANDARD форматі`);
        return this.filterJunkItems(parsedItems);
    }
    filterJunkItems(items) {
        console.log(`\n🗑️ [PARSER] Фільтрація сміття...`);
        const addressPatterns = [
            /вул\.?\s+/i,
            /м\.\s+[А-ЯІЇЄҐа-яіїєґ]/i,
            /тел\.?\s+/i,
            /буд\.?\s+/i,
            /№\s*\d/,
            /^\s*$/,
        ];
        const filtered = items.filter((item, index) => {
            if (!item.cleanProductName || item.cleanProductName.trim() === '') {
                console.log(`   ❌ Позиція ${index + 1}: порожня назва`);
                return false;
            }
            const isJunk = addressPatterns.some(pattern => pattern.test(item.cleanProductName) || pattern.test(item.originalProductName));
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
};
exports.InvoiceParserService = InvoiceParserService;
exports.InvoiceParserService = InvoiceParserService = __decorate([
    (0, common_1.Injectable)()
], InvoiceParserService);
//# sourceMappingURL=invoice-parser.service.js.map