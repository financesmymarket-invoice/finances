import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): import("@prisma/client").Prisma.Prisma__ProductClient<{
        agentId: number | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        category: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        agent: {
            format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
            markupPercent: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
        } | null;
        priceMemory: {
            purchasePrice: number;
            salePrice: number;
            agentId: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            productId: number;
            source: import("@prisma/client").$Enums.PriceSource;
        }[];
    } & {
        agentId: number | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        category: string | null;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ProductClient<({
        agent: {
            format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
            markupPercent: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
        } | null;
        priceMemory: {
            purchasePrice: number;
            salePrice: number;
            agentId: number;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            productId: number;
            source: import("@prisma/client").$Enums.PriceSource;
        }[];
        invoiceItems: {
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
    } & {
        agentId: number | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        category: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateProductDto): import("@prisma/client").Prisma.Prisma__ProductClient<{
        agentId: number | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        category: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__ProductClient<{
        agentId: number | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        category: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
