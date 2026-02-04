import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    category?: string;

    @ApiProperty({ required: false })
    agentId?: number;
}
