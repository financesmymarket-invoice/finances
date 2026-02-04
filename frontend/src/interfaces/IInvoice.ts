// Generated TypeScript interface
// Created with DivMagic JSON to TypeScript converter

interface Agent {
    id: number;
    name: string;
    markupPercent: string;
    createdAt: string;
    updatedAt: string;
}

export interface Item {
    id: number;
    invoiceId: number;
    productId: number;
    productName: string;
    quantity: string;
    purchasePrice: string;
    calculatedPrice: string;
    roundedPrice: string;
    priceChanged: boolean;
    createdAt: string;
    updatedAt: string;
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
    type: string;
    invoiceDate: string;
    markupPercent: string;
    createdAt: string;
    updatedAt: string;
    items: Item;
    agent: Agent;
    photos: Photo[];
}