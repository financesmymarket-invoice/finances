import { ApiProperty } from '@nestjs/swagger';
import { PriceSource } from '@prisma/client';

export class CreatePriceMemoryDto {
    @ApiProperty()
    productId: number;

    @ApiProperty()
    agentId: number;

    @ApiProperty()
    purchasePrice: number;

    @ApiProperty()
    salePrice: number;

    @ApiProperty({ enum: PriceSource })
    source: PriceSource;
}
