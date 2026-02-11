import { ApiProperty } from '@nestjs/swagger';
import { UnitType } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateInvoiceItemDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    invoiceId: number;

    @ApiProperty({ example: 42, required: false })
    @IsOptional()
    @IsInt()
    productId?: number;

    @ApiProperty({ example: 'Мор Каштан 70г' })
    @IsString()
    productName: string;

    @ApiProperty({ enum: UnitType, example: UnitType.PIECE })
    @IsEnum(UnitType)
    unitType: UnitType;

    @ApiProperty({ example: 32, required: false })
    @IsOptional()
    @IsInt()
    @IsPositive()
    boxSize?: number;

    @ApiProperty({ example: 5.5, description: 'Кількість в штуках (для продажу)' })
    @IsNumber()
    @IsPositive()
    quantity: number;

    @ApiProperty({ example: 2, required: false, description: 'Кількість ящиків (якщо BOX)' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    boxesCount?: number;

    @ApiProperty({ example: 120.50, description: 'Закупівельна ціна за одиницю (шт або ящик)' })
    @IsNumber()
    @IsPositive()
    purchasePrice: number;

    @ApiProperty({ example: 3.75, required: false })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    purchasePricePerUnit?: number;

    @ApiProperty({ example: 150.00, required: false })
    @IsOptional()
    @IsNumber()
    calculatedPrice?: number;

    @ApiProperty({ example: 150.00, required: false })
    @IsOptional()
    @IsNumber()
    roundedPrice?: number;

    @ApiProperty({ example: false, required: false })
    @IsOptional()
    priceChanged?: boolean;

    @ApiProperty({ example: false, required: false })
    @IsOptional()
    purchasePriceChanged?: boolean;
}