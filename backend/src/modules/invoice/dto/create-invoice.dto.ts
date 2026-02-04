import { ApiProperty } from '@nestjs/swagger';
import { AddInvoiceItemDto } from './add-invoice-item.dto';

export class CreateInvoiceDto {
    @ApiProperty()
    agentId: number;

    @ApiProperty({ enum: ['INCOME', 'EXPENSE'] })
    type: 'INCOME' | 'EXPENSE';

    @ApiProperty({ type: [AddInvoiceItemDto] })
    items: AddInvoiceItemDto[];
}
