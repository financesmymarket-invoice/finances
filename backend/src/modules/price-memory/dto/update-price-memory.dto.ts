import { ApiProperty } from '@nestjs/swagger';
import { PriceSource } from '@prisma/client';
import { IsInt, Min } from 'class-validator';

export class UpdatePriceMemoryDto {

    @ApiProperty()
    agentId: number;

    @ApiProperty()
    productId: number;

    @ApiProperty({ required: false })
    purchasePrice?: number;

    @ApiProperty({ required: false })
    salePrice?: number;

    @ApiProperty({ required: false, enum: PriceSource })
    source?: PriceSource;
}


export class UpdatePriceDto {
    @IsInt()
    agentId: number; 

    @IsInt()
    productId: number;

    @IsInt()
    @Min(0)
    price: number;

    @IsInt()
    purchasePrice: number;
}
