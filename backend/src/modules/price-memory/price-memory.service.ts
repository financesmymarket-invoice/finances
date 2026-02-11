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

   async update(agentId: number, productId: number, purchasePrice: number, price: number) {
        const res = await this.prisma.productPriceMemory.findFirst({
            where: {
            productId
            }
        })
       console.log('res', res)
       console.log('agentId', agentId)
       console.log('productId', productId)
       console.log('purchasePrice', purchasePrice)

       const memory = await this.prisma.productPriceMemory.update({
            where: {
                productId_agentId_purchasePrice: {
                    productId,
                    agentId,
                    purchasePrice,
                },
            },
            data: {
                salePrice: price,
            },
       }); 
       return memory;
    }




    remove(id: number) {
        return this.prisma.productPriceMemory.delete({ where: { id } });
    }
}
