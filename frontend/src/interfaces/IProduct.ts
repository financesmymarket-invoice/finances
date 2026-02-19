import type { IAgent } from "./IAgent"
import type { InvoiceItem } from "./IInvoice"
import type { ProductPriceMemory } from "./IPriceMemory"

export interface IProduct {
    id: number
    name: string
    category: string | null
    agentId: number | null
    agent?: IAgent | null
    invoiceItems?: InvoiceItem[]
    priceMemory?: ProductPriceMemory[]
}
