import { Injectable } from '@nestjs/common';
import {
    DocumentAnalysisClient,
    AzureKeyCredential,
    AnalyzeResult,
} from '@azure/ai-form-recognizer';
import * as fs from 'fs';

interface ParsedInvoiceItemInternal {
    productName: string;
    quantity: number;         // фінальна кількість в штуках
    purchasePrice: number;    // ціна за одиницю (шт або ящик)
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
        const poller = await this.client.beginAnalyzeDocument('prebuilt-invoice', buffer);
        const result = await poller.pollUntilDone();

        const rawItems = this.extractFromPrebuilt(result);

        // Залежно від агента — пост-обробка
        if (agentId === 4) {
            return this.parseForAgent4(rawItems);
        }

        // Fallback — стандартна обробка
        return rawItems.map(item => ({
            productName: item.productName.trim(),
            quantity: item.quantity || 1,
            purchasePrice: item.unitPrice || 0,
            unitType: 'PIECE',
        }));
    }
    private extractFromPrebuilt(result: AnalyzeResult): Array<{ productName: string; quantity: number; unitPrice: number }> {
        const items: any[] = [];

        const invoice = result.documents?.[0];
        if (!invoice?.fields?.Items) return items;

        // Перевірка, що Items є масивом
        const itemsField = invoice.fields.Items;
        if (itemsField.kind !== 'array' || !itemsField.values) return items;

        for (const item of itemsField.values) {
            if (item.kind !== 'object' || !item.properties) continue;

            const props = item.properties;
            const desc = props.Description?.kind === 'string' ? props.Description.value?.trim() ?? '' : '';
            if (!desc) continue;

            let qty = 0;
            if (props.Quantity?.kind === 'number') qty = props.Quantity.value ?? 0;
            else if (props.Quantity?.kind === 'string') {
                qty = parseFloat((props.Quantity.value ?? '0').replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
            }

            let price = 0;
            const up = props.UnitPrice;
            if (up?.kind === 'currency') price = up.value?.amount ?? 0;
            else if (up?.kind === 'number') price = up.value ?? 0;
            else if (up?.kind === 'string') {
                price = parseFloat((up.value ?? '0').replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
            }

            // Фільтр сміття
            if (/вул\.?|м\.|тел\.?|№/i.test(desc)) continue;

            items.push({ productName: desc, quantity: qty, unitPrice: price });
        }

        return items;
    }
    /**
     * Спеціальний парсер для агента 4
     * Приклад: "МОР КАШТАН ЗІ ЛЬВОВА 70г, 32 шт/ящ - 1ящ"
     */
    private parseForAgent4(rawItems: Array<{ productName: string; quantity: number; unitPrice: number }>): ParsedInvoiceItemInternal[] {
        return rawItems.map(item => {
            let name = item.productName.trim();
            let qty = item.quantity;
            let unitType: 'PIECE' | 'BOX' = 'PIECE';
            let boxSize: number | undefined = undefined;

            // Шукаємо кількість ящиків у тексті
            const boxQtyMatch = name.match(/^(\d+)\s*(ящ|ящик|ящ\.|шт\/ящ)/i) ||
                name.match(/-\s*(\d+)\s*ящ/i) ||
                (qty === 1 && /ящ/i.test(name) ? { 1: '1' } : null);

            const boxSizeMatch = name.match(/(\d+)\s*шт[\/ ]*ящ/i);

            if (boxQtyMatch || boxSizeMatch) {
                unitType = 'BOX';
                boxSize = boxSizeMatch ? parseInt(boxSizeMatch[1], 10) : 30; // дефолт, якщо не знайдено
                const boxes = boxQtyMatch ? parseInt(boxQtyMatch[1] || '1', 10) : qty || 1;
                qty = boxes * (boxSize || 1); // перерахунок в штуки
            }

            // Очищаємо назву від зайвого
            name = name
                .replace(/^\d+\s*(ящ|ящик|ящ\.|шт\/ящ)[^\w]*/i, '')
                .replace(/-\s*\d+\s*ящ/i, '')
                .replace(/,\s*\d+\s*шт[\/ ]*ящ/gi, '')
                .replace(/\s*ящ\.?/gi, '')
                .trim();

            return {
                productName: name || item.productName.trim(),
                quantity: Math.max(1, qty || 1),
                purchasePrice: item.unitPrice || 0,
                unitType,
                boxSize: unitType === 'BOX' ? boxSize : undefined,
            };
        });
    }
}