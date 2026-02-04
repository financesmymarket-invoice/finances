import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InvoiceItemsService } from './invoice-item.service';

@ApiTags('invoice-items')
@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly service: InvoiceItemsService) { }

  @Post()
  @ApiOperation({ summary: 'Create invoice item' })
  create(@Body() dto: CreateInvoiceItemDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoice items' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice item by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update invoice item' })
  update(@Param('id') id: string, @Body() dto: UpdateInvoiceItemDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete invoice item' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
