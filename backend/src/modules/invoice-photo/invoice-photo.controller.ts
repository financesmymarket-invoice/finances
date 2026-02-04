// invoice-photo.controller.ts
import {
  Controller,
  Post,
  Patch,
  UploadedFile,
  UseInterceptors,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { InvoicePhotosService } from './invoice-photo.service';
import { InvoiceType } from 'src/generated/prisma';

@ApiTags('invoice-photos')
@Controller('invoice-photos')
export class InvoicePhotosController {
  constructor(private readonly invoicePhotosService: InvoicePhotosService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        agentId: { type: 'number' },
        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
      },
      required: ['file', 'agentId', 'type'],
    },
  })
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body('agentId') agentId: string,
    @Body('type') type: InvoiceType,
  ) {
    const agentIdNumber = parseInt(agentId, 10);
    if (isNaN(agentIdNumber)) throw new Error('Invalid agentId');

    return this.invoicePhotosService.createFromPhoto({
      file,
      agentId: agentIdNumber,
      type,
    });
  }

  @Patch('items/:itemId/price')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newPrice: { type: 'number' },
      },
      required: ['newPrice'],
    },
  })
  async updateItemPrice(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body('newPrice') newPrice: number,
  ) {
    return this.invoicePhotosService.updateItemPrice(
      itemId,
      newPrice
    );
  }
}