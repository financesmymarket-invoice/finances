interface Agent {
    id: number;
    name: string;
    markupPercent: number; // тепер number, бо зручніше для розрахунків
    createdAt: string;
    updatedAt: string;
}

export interface Item {
    id: number;
    invoiceId: number;
    productId: number;
    productName: string;
    quantity: number;          // number замість string
    unitType: "PIECE" | "BOX"; // додано для нової логіки
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

export type InvoiceType =  "INCOME" | "EXPENSE"

export interface IInvoice {
    id: number;
    agentId: number;
    type: InvoiceType;
    invoiceDate: string;
    markupPercent: number; // number
    createdAt: string;
    updatedAt: string;
    items: Item[];         // масив Item
    agent: Agent;
    photos: Photo[];
}
