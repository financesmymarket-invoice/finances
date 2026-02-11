
import { ApiProperty } from '@nestjs/swagger';
import { UnitType } from '@prisma/client';

export class AddInvoiceItemDto {
    @ApiProperty()
    productName: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    purchasePrice: number;

    @ApiProperty({ required: false })
    salePrice?: number;
    
    @ApiProperty()
    unitType: UnitType;

    @ApiProperty()
    boxSize: number;
}
