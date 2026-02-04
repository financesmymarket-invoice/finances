import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceItemDto {
    @ApiProperty({ required: false })
    quantity?: number;

    @ApiProperty({ required: false })
    purchasePrice?: number;

    @ApiProperty({ required: false })
    calculatedPrice?: number;

    @ApiProperty({ required: false })
    roundedPrice?: number;

    @ApiProperty({ required: false })
    priceChanged?: boolean;
}
