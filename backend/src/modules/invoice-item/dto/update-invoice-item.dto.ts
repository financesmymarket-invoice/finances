import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateInvoiceItemDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    quantity?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    purchasePrice?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    calculatedPrice?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    roundedPrice?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    priceChanged?: boolean;
}


export class UpdateInvoiceItemPriceDto {
    @ApiProperty({ description: 'Ціна за одиницю в копійках' })
    @IsInt()
    @Min(0)
    calculatedPrice: number;
}

