import { CreatePriceMemoryDto } from './dto/create-price-memory.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PriceMemoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePriceMemoryDto): import("@prisma/client").Prisma.Prisma__ProductPriceMemoryClient<{
        purchasePrice: number;
        salePrice: number;
        agentId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        source: import("@prisma/client").$Enums.PriceSource;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        purchasePrice: number;
        salePrice: number;
        agentId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        source: import("@prisma/client").$Enums.PriceSource;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ProductPriceMemoryClient<{
        purchasePrice: number;
        salePrice: number;
        agentId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        source: import("@prisma/client").$Enums.PriceSource;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(agentId: number, productId: number, purchasePrice: number, price: number): Promise<{
        purchasePrice: number;
        salePrice: number;
        agentId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        source: import("@prisma/client").$Enums.PriceSource;
    }>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__ProductPriceMemoryClient<{
        purchasePrice: number;
        salePrice: number;
        agentId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        source: import("@prisma/client").$Enums.PriceSource;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
