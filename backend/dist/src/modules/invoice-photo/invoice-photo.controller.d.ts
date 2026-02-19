import { InvoicePhotosService } from './invoice-photo.service';
import { InvoiceType } from '@prisma/client';
export declare class InvoicePhotosController {
    private readonly invoicePhotosService;
    constructor(invoicePhotosService: InvoicePhotosService);
    uploadPhoto(file: Express.Multer.File, agentId: string, type: InvoiceType): Promise<{
        invoice: {
            id: number;
            agentId: number;
            type: import("@prisma/client").$Enums.InvoiceType;
            invoiceDate: string;
            markupPercent: number;
        };
        items: {
            id: number;
            productName: string;
            unitType: import("@prisma/client").$Enums.UnitType;
            boxSize: number | null;
            quantity: number;
            boxesCount: number | null;
            purchasePrice: number;
            purchasePricePerUnit: number | null;
            calculatedPrice: number;
            roundedPrice: number;
            priceChanged: boolean;
            purchasePriceChanged: boolean;
        }[];
        photo: {
            id: number;
            processed: boolean;
        };
    }>;
}
