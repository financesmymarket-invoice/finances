import { Injectable } from '@nestjs/common';
import { CreatePriceMemoryDto } from './dto/create-price-memory.dto';
import { UpdatePriceMemoryDto } from './dto/update-price-memory.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PriceMemoryService {
    constructor(private prisma: PrismaService) { }

    create(dto: CreatePriceMemoryDto) {
        return this.prisma.productPriceMemory.create({ data: dto });
    }

    findAll() {
        return this.prisma.productPriceMemory.findMany();
    }

    findOne(id: number) {
        return this.prisma.productPriceMemory.findUnique({ where: { id } });
    }

    update(id: number, dto: UpdatePriceMemoryDto) {
        return this.prisma.productPriceMemory.update({ where: { id }, data: dto });
    }

    remove(id: number) {
        return this.prisma.productPriceMemory.delete({ where: { id } });
    }
}
