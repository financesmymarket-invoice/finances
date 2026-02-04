import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InvoicesController } from './invoice.controller';
import { InvoicesService } from './invoice.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService],
})
export class InvoiceModule {}
