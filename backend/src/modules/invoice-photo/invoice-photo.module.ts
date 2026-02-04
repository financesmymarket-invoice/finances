import { Module } from '@nestjs/common';
import { InvoicePhotosController } from './invoice-photo.controller';
import { InvoicePhotosService } from './invoice-photo.service';
import { PrismaService } from 'prisma/prisma.service';
import { AzureOcrService } from '../azureOcr/AzureOcrService.service';

@Module({
  controllers: [InvoicePhotosController],
  providers: [InvoicePhotosService, PrismaService, AzureOcrService],
})
export class InvoicePhotoModule {}
