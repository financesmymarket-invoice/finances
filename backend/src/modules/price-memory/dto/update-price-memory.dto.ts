import { ApiProperty } from '@nestjs/swagger';
import { PriceSource } from 'src/generated/prisma';

export class UpdatePriceMemoryDto {
    @ApiProperty({ required: false })
    purchasePrice?: number;

    @ApiProperty({ required: false })
    salePrice?: number;

    @ApiProperty({ required: false, enum: PriceSource })
    source?: PriceSource;
}

