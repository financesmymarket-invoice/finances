import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PriceMemoryService } from './price-memory.service';
import { CreatePriceMemoryDto } from './dto/create-price-memory.dto';
import { UpdatePriceMemoryDto } from './dto/update-price-memory.dto';

@ApiTags('price-memory')
@Controller('price-memory')
export class PriceMemoryController {
  constructor(private readonly service: PriceMemoryService) { }

  @Post()
  @ApiOperation({ summary: 'Create price memory record' })
  create(@Body() dto: CreatePriceMemoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all price memory records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get price memory record by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update price memory record' })
  update(@Param('id') id: string, @Body() dto: UpdatePriceMemoryDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete price memory record' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
