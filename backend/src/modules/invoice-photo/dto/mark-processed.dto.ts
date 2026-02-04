import { ApiProperty } from '@nestjs/swagger';

export class MarkProcessedDto {
    @ApiProperty()
    processed: boolean;
}
