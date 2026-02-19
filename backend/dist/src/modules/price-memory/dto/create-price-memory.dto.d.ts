import { PriceSource } from '@prisma/client';
export declare class CreatePriceMemoryDto {
    productId: number;
    agentId: number;
    purchasePrice: number;
    salePrice: number;
    source: PriceSource;
}
