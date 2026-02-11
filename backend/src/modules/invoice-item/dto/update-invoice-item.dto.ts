import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateInvoiceItemDto {
    @ApiProperty()
    quantity?: number;

    @ApiProperty()
    purchasePrice?: number;

    @ApiProperty()
    calculatedPrice?: number;

    @ApiProperty()
    roundedPrice?: number;

    @ApiProperty()
    priceChanged?: boolean;
}

export class UpdateInvoiceItemPriceDto {
    @ApiProperty({ description: 'Ціна за одиницю в копійках' })
    @IsInt()
    @Min(0)
    calculatedPrice: number;
}

