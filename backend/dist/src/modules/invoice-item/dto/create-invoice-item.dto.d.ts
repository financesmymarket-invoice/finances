import { UnitType } from '@prisma/client';
export declare class CreateInvoiceItemDto {
    invoiceId: number;
    productId?: number;
    productName: string;
    unitType: UnitType;
    boxSize?: number;
    quantity: number;
    boxesCount?: number;
    purchasePrice: number;
    purchasePricePerUnit?: number;
    calculatedPrice?: number;
    roundedPrice?: number;
    priceChanged?: boolean;
    purchasePriceChanged?: boolean;
}
