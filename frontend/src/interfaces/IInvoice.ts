
import type { IAgent } from "./IAgent";
import type { InvoiceType, UnitType } from "./InvoiceEnum";



export interface InvoiceItem {
    id: number;
    invoiceId: number;
    productId: number;
    productName: string;
    quantity: number;          // number замість string
    unitType: UnitType; // додано для нової логіки
    boxSize?: number | null;   // додано для BOX
    purchasePrice: number;     // number, в копійках
    purchasePricePerUnit?: number | null; // number, в копійках
    calculatedPrice: number;   // number, в копійках
    roundedPrice: number;      // number, в копійках
    priceChanged: boolean;
    purchasePriceChanged: boolean;
    createdAt: string;
    updatedAt: string;
    boxesCount: number;
}

interface Photo {
    id: number;
    invoiceId: number;
    url: string;
    processed: boolean;
    createdAt: string;
}


export interface IInvoice {
    id: number;
    agentId: number;
    type: InvoiceType;
    invoiceDate: string;
    markupPercent: number; // number
    createdAt: string;
    updatedAt: string;
    items: InvoiceItem[];         // масив Item
    agent: IAgent;
    photos: Photo[];
}
