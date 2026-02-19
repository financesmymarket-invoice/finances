import { AddInvoiceItemDto } from './add-invoice-item.dto';
export declare class CreateInvoiceDto {
    agentId: number;
    type: 'INCOME' | 'EXPENSE';
    items: AddInvoiceItemDto[];
}
