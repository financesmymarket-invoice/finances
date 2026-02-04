import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesService } from './invoice.service';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoicesService) { }

  // Створити нову накладну
  @Post()
  @ApiOperation({ summary: 'Create new invoice with items' })
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoiceService.create(dto);
  }

  // Отримати всі накладні
  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  findAll(@Query('type') type?: 'INCOME' | 'EXPENSE') {
    return this.invoiceService.findAll(type);
  }

  // Отримати одну накладну по ID разом з позиціями
  @Get(':id')
  @ApiOperation({ summary: 'Get invoice by ID with items' })
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(Number(id));
  }
}
