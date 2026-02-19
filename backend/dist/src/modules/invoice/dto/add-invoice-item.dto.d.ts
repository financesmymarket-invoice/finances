import { UnitType } from '@prisma/client';
export declare class AddInvoiceItemDto {
    productName: string;
    quantity: number;
    purchasePrice: number;
    salePrice?: number;
    unitType: UnitType;
    boxSize: number;
}
