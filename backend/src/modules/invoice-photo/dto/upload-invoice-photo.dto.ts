import { ApiProperty } from '@nestjs/swagger';

export class UploadInvoicePhotoDto {
    @ApiProperty()
    invoiceId: number;

    @ApiProperty()
    url: string;
}


export class ParsedInvoiceItemDto {
    @ApiProperty()
    productName: string;

    @ApiProperty({ type: String, description: 'string' })
    quantity: string;

    @ApiProperty({ type: String, description: 'string' })
    purchasePrice: string;
}

