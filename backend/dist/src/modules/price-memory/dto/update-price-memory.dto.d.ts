import { PriceSource } from '@prisma/client';
export declare class UpdatePriceMemoryDto {
    agentId: number;
    productId: number;
    purchasePrice?: number;
    salePrice?: number;
    source?: PriceSource;
}
export declare class UpdatePriceDto {
    agentId: number;
    productId: number;
    price: number;
    purchasePrice: number;
}
