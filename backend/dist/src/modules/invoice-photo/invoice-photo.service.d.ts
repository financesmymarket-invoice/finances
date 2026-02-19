import { PrismaService } from 'prisma/prisma.service';
import { AzureOcrService } from '../azureOcr/AzureOcrService.service';
import { InvoiceType } from '@prisma/client';
export declare class InvoicePhotosService {
    private prisma;
    private azureOcrService;
    constructor(prisma: PrismaService, azureOcrService: AzureOcrService);
    createFromPhoto(params: {
        file: Express.Multer.File;
        agentId: number;
        type: InvoiceType;
    }): Promise<{
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
    private createInvoiceItems;
    private savePriceMemory;
}
