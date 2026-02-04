import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateAgentDto {
    @ApiProperty({ example: 'Молокія' })
    @IsString()
    name: string;

    @ApiProperty({ example: 20 })
    @IsNumber()
    @Min(0)
    markupPercent: number;
}
