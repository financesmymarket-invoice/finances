"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureOcrService = void 0;
const common_1 = require("@nestjs/common");
const ai_form_recognizer_1 = require("@azure/ai-form-recognizer");
const fs = __importStar(require("fs"));
let AzureOcrService = class AzureOcrService {
    client;
    constructor() {
        const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
        const apiKey = process.env.AZURE_FORM_RECOGNIZER_KEY;
        if (!endpoint || !apiKey) {
            throw new Error('Azure credentials not configured');
        }
        this.client = new ai_form_recognizer_1.DocumentAnalysisClient(endpoint, new ai_form_recognizer_1.AzureKeyCredential(apiKey));
    }
    async extractInvoiceItems(filePath, agentId) {
        console.log(`[OCR] Початок для agentId=${agentId}, файл: ${filePath}`);
        const buffer = fs.readFileSync(filePath);
        if (agentId) {
            const poller = await this.client.beginAnalyzeDocument('prebuilt-layout', buffer);
            const result = await poller.pollUntilDone();
            if (agentId === 1 || agentId === 20)
                return this.parseForAgent1(result);
            if (agentId === 2)
                return this.parseForAgent2(result);
            if (agentId === 3)
                return this.parseForAgent3(result);
            if (agentId === 4)
                return this.parseForAgent4(result);
            if (agentId === 5)
                return this.parseForAgent5(result);
            if (agentId === 6)
                return this.parseForAgent6(result);
            if (agentId === 9)
                return this.parseForAgent7(result);
            if (agentId === 10)
                return this.parseForAgent10(result);
            if (agentId === 11)
                return this.parseForAgent11(result);
            if (agentId === 12)
                return this.parseForAgent12(result);
            if (agentId === 14)
                return this.parseForAgent14(result);
            if (agentId === 15 || agentId === 16 || agentId === 19)
                return this.parseForAgent15(result);
            if (agentId === 17)
                return this.parseForAgent17(result);
            if (agentId === 18)
                return this.parseForAgent18(result);
            if (agentId === 21)
                return this.parseForAgent21(result);
            if (agentId === 22)
                return this.parseForAgent22(result);
            if (agentId === 23)
                return this.parseForAgent23(result);
            if (agentId === 24)
                return this.parseForAgent24(result);
            if (agentId === 25)
                return this.parseForAgent25(result);
            if (agentId === 28)
                return this.parseForAgent28(result);
            if (agentId === 30)
                return this.parseForAgent30(result);
            if (agentId === 31 || agentId === 32)
                return this.parseForAgent31(result);
            if (agentId === 33)
                return this.parseForAgent33(result);
            if (agentId === 34)
                return this.parseForAgent34(result);
        }
        const poller = await this.client.beginAnalyzeDocument('prebuilt-invoice', buffer);
        const result = await poller.pollUntilDone();
        const rawItems = this.extractFromPrebuilt(result);
        return rawItems.map(item => ({
            productName: item.productName.trim(),
            quantity: item.quantity || 1,
            purchasePrice: Math.round((item.unitPrice || 0) * 100),
            unitType: 'PIECE',
        }));
    }
    extractFromPrebuilt(result) {
        const items = [];
        const invoice = result.documents?.[0];
        if (!invoice?.fields?.Items) {
            return items;
        }
        const itemsField = invoice.fields.Items;
        if (itemsField.kind !== 'array' || !itemsField.values) {
            return items;
        }
        for (let i = 0; i < itemsField.values.length; i++) {
            const item = itemsField.values[i];
            if (item.kind !== 'object' || !item.properties)
                continue;
            const props = item.properties;
            const desc = props.Description?.kind === 'string' ? props.Description.value?.trim() ?? '' : '';
            if (!desc) {
                continue;
            }
            let qty = 0;
            if (props.Quantity?.kind === 'number') {
                qty = props.Quantity.value ?? 0;
            }
            else if (props.Quantity?.kind === 'string') {
                const qtyStr = (props.Quantity.value ?? '0').replace(',', '.').replace(/[^0-9.]/g, '');
                qty = parseFloat(qtyStr) || 0;
            }
            let price = 0;
            const up = props.UnitPrice;
            if (up?.kind === 'currency') {
                price = up.value?.amount ?? 0;
            }
            else if (up?.kind === 'number') {
                price = up.value ?? 0;
            }
            else if (up?.kind === 'string') {
                const priceStr = (up.value ?? '0').replace(',', '.').replace(/[^0-9.]/g, '');
                price = parseFloat(priceStr) || 0;
            }
            if (/вул\.?|м\.|тел\.?|№/i.test(desc)) {
                continue;
            }
            items.push({ productName: desc, quantity: qty, unitPrice: price });
        }
        return items;
    }
    parseForAgent1(result) {
        console.log(`\n📊 [AGENT 1] Парсинг накладної Молокія`);
        const items = [];
        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }
        const table = result.tables[0];
        console.log(`📋 Таблиця має ${table.rowCount} рядків і ${table.columnCount} колонок`);
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
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
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            console.log(`📋 Всі комірки в рядку ${rowIdx}:`);
            cells.forEach(cell => {
                console.log(`  [col ${cell.columnIndex}]: "${cell.content?.trim().substring(0, 50)}..."`);
            });
            if (rowIdx === 0) {
                console.log(`⚠️ [SKIP] Це заголовок`);
                continue;
            }
            const rawName = cells.find(c => c.columnIndex === 2)?.content?.trim() || '';
            const qtyStr = cells.find(c => c.columnIndex === 3)?.content?.trim() || '';
            const priceStr = cells.find(c => c.columnIndex === 5)?.content?.trim() || '';
            let productName = rawName.replace(/:\s*(selected|unselected)\s*:/gi, '')
                .replace(/\n/g, ' ')
                .trim();
            if (!productName || productName.length < 3) {
                console.warn(`⚠️ [SKIP] Назва занадто коротка: "${rawName}"`);
                continue;
            }
            const quantity = Number(qtyStr.replace(/[^\d]/g, '')) || 0;
            if (quantity <= 0) {
                console.warn(`⚠️ [SKIP] Некоректна кількість: "${qtyStr}" → ${quantity}`);
                continue;
            }
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
    parseForAgent2(result) {
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            if (rowIdx === 0)
                return;
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 1);
            if (!nameCell || nameCell.content.length < 5)
                return;
            let rawQty = "";
            let rawPrice = "";
            let rawUnit = "";
            cells.forEach(cell => {
                const content = cell.content.trim();
                if (/^\d+([,. ]\d+)?$/.test(content)) {
                    if (cell.columnIndex === 2)
                        rawQty = content;
                    if (cell.columnIndex >= 4 && cell.columnIndex <= 6)
                        rawPrice = content;
                }
                if (/шт|пл|ящ/i.test(content)) {
                    rawUnit = content;
                }
            });
            if (!rawPrice) {
                const numericCells = cells.filter(c => /[\d,.]+/.test(c.content));
                if (numericCells.length >= 2) {
                    rawPrice = numericCells[numericCells.length - 2].content;
                }
            }
            let cleanName = nameCell.content
                .replace(/ФІЗИЧНА ОСОБА|ПІДПРИЄМЕЦЬ|ГОРИНСЬКИЙ|ДЛЯ ДОКУМЕНТІВ|Ігор Іванович/gi, '')
                .replace(/\n/g, ' ')
                .trim();
            const priceUAH = parseFloat(rawPrice.replace(',', '.')) || 0;
            const qty = parseFloat(rawQty.replace(',', '.')) || 0;
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
    parseForAgent3(result) {
        console.log(`\n📊 [AGENT 3] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent4(result) {
        console.log(`\n📊 [AGENT 4] Парсинг таблиці`);
        const items = [];
        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        for (let rowIdx = 1; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells || cells.length < 5)
                continue;
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
            if (!rawName || /уcього|вул\.|тел\.|№/i.test(rawName))
                continue;
            rawName = rawName
                .replace(/:\s*(selected|unselected)\s*:/gi, '')
                .replace(/\n/g, ' ')
                .trim();
            let baseQty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (baseQty <= 0)
                continue;
            const cleanPrice = rawPrice.replace(':', '.');
            const priceMatch = cleanPrice.match(/(\d+)[,.]?(\d{0,2})/);
            const priceUAH = priceMatch
                ? parseFloat(`${priceMatch[1]}.${priceMatch[2] || '00'}`)
                : 0;
            if (priceUAH <= 0)
                continue;
            let finalQty = baseQty;
            let unitType = 'PIECE';
            let boxSize = undefined;
            let purchasePriceCents;
            const isBox = /ящ/i.test(rawUnit);
            if (isBox) {
                unitType = 'BOX';
                let boxSizeMatch = rawName.match(/(\d+)\s*шт[\s\/]*ящ/i);
                if (boxSizeMatch) {
                    boxSize = parseInt(boxSizeMatch[1], 10);
                }
                else {
                    const weightMatch = rawName.match(/(\d+(?:[,.]\d+)?)\s*(кг|г|л|мл)/i);
                    if (weightMatch) {
                        const value = parseFloat(weightMatch[1].replace(',', '.'));
                        const unit = weightMatch[2].toLowerCase();
                        if (unit === 'кг' || unit === 'л') {
                            boxSize = Math.round(value);
                        }
                        else if (unit === 'г' || unit === 'мл') {
                            boxSize = Math.round(value / 1000);
                        }
                        if (!boxSize || boxSize <= 0)
                            boxSize = 1;
                    }
                }
                if (!boxSize || boxSize <= 0)
                    boxSize = 30;
                finalQty = baseQty * boxSize;
                purchasePriceCents = Math.round(priceUAH * 100);
            }
            else {
                finalQty = baseQty;
                purchasePriceCents = Math.round(priceUAH * 100);
            }
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
    parseForAgent5(result) {
        console.log(`\n📊 [AGENT 5] Парсинг таблиці Шувара`);
        const items = [];
        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }
        const table = result.tables[0];
        console.log(`📋 Таблиця має ${table.rowCount} рядків і ${table.columnCount} колонок`);
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
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
            if (!rawName || /назва|товару|штрихкод|усього|податок|оплати/i.test(rawName)) {
                continue;
            }
            const cleanName = rawName.replace(/:\s*(selected|unselected)\s*:/gi, '').replace(/\n/g, ' ').trim();
            const cleanQty = rawQty.replace(/:\s*(selected|unselected)\s*:/gi, '').replace(/\s/g, '');
            const qty = parseInt(cleanQty.replace(/[^0-9]/g, ''), 10) || 0;
            if (qty <= 0)
                continue;
            const cleanPrice = rawPrice.replace(/[^0-9.,]/g, '').replace(',', '.').trim();
            const price = parseFloat(cleanPrice) || 0;
            if (price <= 0)
                continue;
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
    parseForAgent6(result) {
        console.log(`\n📊 [AGENT 6] Парсинг таблиці`);
        const items = [];
        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        for (let rowIdx = 0; rowIdx < table.rowCount; rowIdx++) {
            const cells = rows.get(rowIdx);
            if (!cells || cells.length < 6)
                continue;
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5);
            let rawName = nameCell?.content?.trim() ?? '';
            const rawQty = qtyCell?.content?.trim() ?? '0';
            const rawPrice = priceCell?.content?.trim() ?? '0';
            if (!rawName || /товар|к-ть|од|разом|знижка|округлення|вага|одна тисяча/i.test(rawName))
                continue;
            rawName = rawName
                .replace(/:\s*(selected|unselected)\s*:/gi, '')
                .replace(/\n/g, ' ')
                .trim();
            let qty = Number(rawQty.replace(/[^\d]/g, '')) || 0;
            if (qty <= 0)
                qty = 1;
            const cleanPrice = rawPrice.replace(',', '.');
            const priceMatch = cleanPrice.match(/(\d+)\.?(\d{0,2})/);
            const priceUAH = priceMatch
                ? parseFloat(`${priceMatch[1]}.${priceMatch[2] || '00'}`)
                : 0;
            if (priceUAH <= 0)
                continue;
            const priceCents = Math.round(priceUAH * 100);
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
    parseForAgent7(result) {
        console.log(`\n📊 [AGENT 7] Парсинг Biscotti (ящики + вага з назви)`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            if (!firstCell || !/^\d+$/.test(firstCell.content.trim()))
                return;
            const nameCell = cells.find(c => c.columnIndex === 3);
            const boxesCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 5);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            const weightMatch = rawName.match(/(\d+[.,]\d+)\s*кг/i);
            let weightPerBox = 1;
            if (weightMatch) {
                weightPerBox = parseFloat(weightMatch[1].replace(',', '.'));
            }
            const boxesQty = parseFloat(boxesCell?.content?.replace(',', '.') || "0") || 0;
            const totalWeight = boxesQty * weightPerBox;
            const priceUAH = parseFloat(priceCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
            if (totalWeight > 0 && priceUAH > 0) {
                items.push({
                    productName: rawName,
                    quantity: totalWeight,
                    purchasePrice: Math.round(priceUAH * 100),
                    unitType: 'BOX',
                    boxSize: weightPerBox
                });
            }
        });
        return items;
    }
    parseForAgent10(result) {
        console.log(`\n📊 [AGENT 10] Парсинг накладної Джерельна`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 6);
            if (!nameCell || !qtyCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;
            const priceUAH = parseFloat(priceCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
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
    parseForAgent11(result) {
        console.log(`\n📊 [AGENT 11] Парсинг накладної Галичина`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 4);
            if (!nameCell || !qtyCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;
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
    parseForAgent12(result) {
        console.log(`\n📊 [AGENT 12] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        console.log(`\n🔍 [DEBUG] Таблиця має ${table.rowCount} рядків і ${table.columnCount} стовпців`);
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            if (rowIdx <= 2) {
                console.log(`\n🔍 [DEBUG] Рядок ${rowIdx}:`);
                cells.forEach(cell => {
                    console.log(`  col ${cell.columnIndex}: "${cell.content}"`);
                });
            }
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);
            if (!nameCell || !qtyCell || !priceCell) {
                console.log(`⚠️ [DEBUG] Рядок ${rowIdx}: відсутні клітинки - name=${!!nameCell}, qty=${!!qtyCell}, price=${!!priceCell}`);
                return;
            }
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            console.log(`\n✅ [DEBUG] Рядок ${rowIdx}: name="${rawName}", qty="${qtyCell.content}", price="${priceCell.content}"`);
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;
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
    parseForAgent14(result) {
        console.log(`\n📊 [AGENT 14] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 0);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 7);
            if (!nameCell || !qtyCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            if (/найменування|штрих-код|назва/i.test(rawName))
                return;
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;
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
    parseForAgent15(result) {
        console.log(`\n📊 [AGENT 15] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 4);
            if (!nameCell || !qtyCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            if (/номенклатура|штрихкод|найменування/i.test(rawName))
                return;
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;
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
        console.log('items', items);
        return items;
    }
    parseForAgent17(result) {
        console.log(`\n📊 [AGENT 17] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 6);
            const priceCell = cells.find(c => c.columnIndex === 7);
            if (!nameCell || !qtyCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            const quantity = parseFloat(qtyCell.content.replace(',', '.')) || 0;
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
    parseForAgent18(result) {
        console.log(`\n📊 [AGENT 18] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length) {
            console.error('❌ Таблиці не знайдено');
            return items;
        }
        const table = result.tables[0];
        console.log(`\n🔍 [DEBUG] Таблиця має ${table.rowCount} рядків і ${table.columnCount} стовпців`);
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            if (rowIdx <= 5) {
                console.log(`\n🔍 [DEBUG] Рядок ${rowIdx}:`);
                cells.forEach(cell => {
                    console.log(`  col ${cell.columnIndex}: "${cell.content}"`);
                });
            }
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
            if (rowIdx <= 8) {
                console.log(`\n✅ [DEBUG] Рядок ${rowIdx}: name="${rawName}", qty="${qtyCell?.content}", price="${priceCell.content}"`);
            }
            if (/товар|к-сть|ціна|всього/i.test(rawName))
                return;
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent21(result) {
        console.log(`\n📊 [AGENT 21] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 4);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent22(result) {
        console.log(`\n📊 [AGENT 22] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 4);
            const qtyCell = cells.find(c => c.columnIndex === 6);
            const priceCell = cells.find(c => c.columnIndex === 7);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            if (/найменування|товар|код|штрих/i.test(rawName))
                return;
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent23(result) {
        console.log(`\n📊 [AGENT 23] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 3);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 8);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent24(result) {
        console.log(`\n📊 [AGENT 24] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 4);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 8);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent25(result) {
        console.log(`\n📊 [AGENT 25] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 4);
            const priceCell = cells.find(c => c.columnIndex === 12);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            if (/найменування|сорт|марка|код|^\d+$/i.test(rawName))
                return;
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent28(result) {
        console.log(`\n📊 [AGENT 27] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 1);
            const weightCell = cells.find(c => c.columnIndex === 2);
            const boxesCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            const weight = weightCell ? (parseFloat(weightCell.content.replace(',', '.')) || 0) : 0;
            const boxes = boxesCell ? (parseFloat(boxesCell.content.replace(',', '.')) || 0) : 0;
            let quantity = weight * boxes;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent30(result) {
        console.log(`\n📊 [AGENT 30] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 6);
            const priceCell = cells.find(c => c.columnIndex === 7);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            if (/^назва\s*$/i.test(rawName) || /штрихкод|^упак\.|^сума$|^ціна$/i.test(rawName))
                return;
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent31(result) {
        console.log(`\n📊 [AGENT 30] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 1);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            const priceCell = cells.find(c => c.columnIndex === 6);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            if (/^назва\s*$/i.test(rawName) || /штрихкод|^упак\.|^сума$|^ціна$/i.test(rawName))
                return;
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent33(result) {
        console.log(`\n📊 [AGENT 33] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const firstCell = cells.find(c => c.columnIndex === 0);
            const rowNo = parseInt(firstCell?.content || "");
            if (isNaN(rowNo))
                return;
            const nameCell = cells.find(c => c.columnIndex === 2);
            const priceCell = cells.find(c => c.columnIndex === 4);
            const qtyCell = cells.find(c => c.columnIndex === 5);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
    parseForAgent34(result) {
        console.log(`\n📊 [AGENT 34] Парсинг накладної`);
        const items = [];
        if (!result.tables?.length)
            return items;
        const table = result.tables[0];
        const rows = new Map();
        for (const cell of table.cells) {
            if (!rows.has(cell.rowIndex))
                rows.set(cell.rowIndex, []);
            rows.get(cell.rowIndex).push(cell);
        }
        rows.forEach((cells, rowIdx) => {
            cells.sort((a, b) => a.columnIndex - b.columnIndex);
            const nameCell = cells.find(c => c.columnIndex === 2);
            const qtyCell = cells.find(c => c.columnIndex === 3);
            const priceCell = cells.find(c => c.columnIndex === 5);
            if (!nameCell || !priceCell)
                return;
            let rawName = nameCell.content.replace(/\n/g, ' ').trim();
            if (/^товар$|^код$|^сума$|^ціна$|^кількість$/i.test(rawName))
                return;
            let quantity = qtyCell ? (parseFloat(qtyCell.content.replace(',', '.').replace(/[^\d.]/g, '')) || 0) : 0;
            if (quantity <= 0)
                quantity = 1;
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
};
exports.AzureOcrService = AzureOcrService;
exports.AzureOcrService = AzureOcrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AzureOcrService);
//# sourceMappingURL=AzureOcrService.service.js.map