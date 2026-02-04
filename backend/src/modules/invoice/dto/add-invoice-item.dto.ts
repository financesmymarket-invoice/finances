import { ApiProperty } from '@nestjs/swagger';

export class AddInvoiceItemDto {
    @ApiProperty()
    productName: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    purchasePrice: number;

    @ApiProperty({ required: false })
    salePrice?: number;
}
