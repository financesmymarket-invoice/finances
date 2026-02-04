import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    category?: string;

    @ApiProperty({ required: false })
    agentId?: number;
}
