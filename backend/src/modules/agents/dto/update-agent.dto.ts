import { ApiProperty } from '@nestjs/swagger';

export class UpdateAgentDto {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    markupPercent?: number;
}
