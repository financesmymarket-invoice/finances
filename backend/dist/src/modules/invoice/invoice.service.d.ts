import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateInvoiceDto): Promise<{
        type: import("@prisma/client").$Enums.InvoiceType;
        agentId: number;
        invoiceDate: Date;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(type?: 'INCOME' | 'EXPENSE'): Promise<({
        agent: {
            format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
            markupPercent: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
        };
        items: {
            productName: string;
            quantity: number;
            purchasePrice: number;
            unitType: import("@prisma/client").$Enums.UnitType;
            boxSize: number | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            invoiceId: number;
            productId: number | null;
            boxesCount: number | null;
            purchasePricePerUnit: number | null;
            calculatedPrice: number;
            roundedPrice: number;
            priceChanged: boolean;
            purchasePriceChanged: boolean;
        }[];
        photos: {
            createdAt: Date;
            id: number;
            invoiceId: number;
            url: string;
            processed: boolean;
        }[];
    } & {
        type: import("@prisma/client").$Enums.InvoiceType;
        agentId: number;
        invoiceDate: Date;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        items: {
            purchasePrice: string;
            purchasePricePerUnit: string | 0 | null;
            calculatedPrice: string;
            roundedPrice: string;
            productName: string;
            quantity: number;
            unitType: import("@prisma/client").$Enums.UnitType;
            boxSize: number | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            invoiceId: number;
            productId: number | null;
            boxesCount: number | null;
            priceChanged: boolean;
            purchasePriceChanged: boolean;
        }[];
        agent: {
            format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
            markupPercent: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
        };
        photos: {
            createdAt: Date;
            id: number;
            invoiceId: number;
            url: string;
            processed: boolean;
        }[];
        type: import("@prisma/client").$Enums.InvoiceType;
        agentId: number;
        invoiceDate: Date;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null>;
}
