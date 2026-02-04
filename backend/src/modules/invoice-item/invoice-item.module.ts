import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InvoiceItemsController } from './invoice-item.controller';
import { InvoiceItemsService } from './invoice-item.service';

@Module({
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService, PrismaService],
})
export class InvoiceItemModule {}
