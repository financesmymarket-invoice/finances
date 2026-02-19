import type { IAgent } from "./IAgent"
import type { PriceSource } from "./InvoiceEnum"
import type { IProduct } from "./IProduct"

export interface ProductPriceMemory {
    id: number;
    productId: number;
    product?: IProduct;
    agentId: number;
    agent?: IAgent;
    purchasePrice: number;
    salePrice: number;
    source: PriceSource;
    createdAt: string;
    updatedAt: string;
}
