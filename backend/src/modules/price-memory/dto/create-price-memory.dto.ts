import { ApiProperty } from '@nestjs/swagger';
import { PriceSource } from 'src/generated/prisma';

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
