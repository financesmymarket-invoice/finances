import { AgentInvoiceFormat, UnitType } from '@prisma/client';
export interface RawOcrItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}
export interface ParsedInvoiceItem {
    originalProductName: string;
    cleanProductName: string;
    unit: UnitType;
    quantity: number;
    unitsPerBox?: number;
    purchasePrice: number;
    purchasePricePerPiece?: number;
}
export declare class InvoiceParserService {
    parseItems(rawItems: RawOcrItem[], agentFormat: AgentInvoiceFormat, agentConfig?: {
        boxPattern?: string;
        unitsPerBoxPattern?: string;
    }): ParsedInvoiceItem[];
    private parseBoxInQtyFormat;
    private parseStandardFormat;
    private filterJunkItems;
}
