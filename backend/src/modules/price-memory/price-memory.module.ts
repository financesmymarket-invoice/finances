import { Module } from '@nestjs/common';
import { PriceMemoryService } from './price-memory.service';
import { PriceMemoryController } from './price-memory.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PriceMemoryController],
  providers: [PriceMemoryService, PrismaService],
})
export class PriceMemoryModule {}
