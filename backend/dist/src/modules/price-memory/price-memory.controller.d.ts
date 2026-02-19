import { PriceMemoryService } from './price-memory.service';
import { CreatePriceMemoryDto } from './dto/create-price-memory.dto';
import { UpdatePriceDto } from './dto/update-price-memory.dto';
export declare class PriceMemoryController {
    private readonly service;
    constructor(service: PriceMemoryService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ProductPriceMemoryClient<{
        purchasePrice: number;
        salePrice: number;
        agentId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        source: import("@prisma/client").$Enums.PriceSource;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdatePriceDto): Promise<{
        purchasePrice: number;
        salePrice: number;
        agentId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        productId: number;
        source: import("@prisma/client").$Enums.PriceSource;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ProductPriceMemoryClient<{
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
