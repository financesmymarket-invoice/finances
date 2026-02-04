import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { PrismaService } from 'prisma/prisma.service';
import { InvoiceType, PriceSource } from '@prisma/client';

@Injectable()
export class InvoicesService {
    constructor(private prisma: PrismaService) { }

    // Створення накладної + позицій + PriceMemory
    async create(dto: CreateInvoiceDto) {
        return this.prisma.$transaction(async (tx) => {
            // Отримуємо % націнки від агента
            const agent = await tx.agent.findUnique({ where: { id: dto.agentId } });
            if (!agent) throw new Error('Agent not found');

            const invoice = await tx.invoice.create({
                data: {
                    agentId: dto.agentId,
                    type: dto.type as InvoiceType,
                    invoiceDate: new Date(),
                    markupPercent: agent.markupPercent,
                },
            });

            for (const item of dto.items) {
                // 1. знайти або створити продукт
                let product = await tx.product.findFirst({ where: { name: item.productName } });
                if (!product) {
                    product = await tx.product.create({ data: { name: item.productName } });
                }

                // 2. перевірити ProductPriceMemory
                let memory = await tx.productPriceMemory.findUnique({
                    where: {
                        productId_agentId_purchasePrice: {
                            productId: product.id,
                            agentId: dto.agentId,
                            purchasePrice: item.purchasePrice,
                        },
                    },
                });

                // якщо пам'яті немає → створюємо по формулі
                let salePrice = item.salePrice
                    ? item.salePrice
                    : memory?.salePrice ?? item.purchasePrice;

                let source: PriceSource = memory?.source ?? PriceSource.AUTO;

                if (!memory) {
                    memory = await tx.productPriceMemory.create({
                        data: {
                            productId: product.id,
                            agentId: dto.agentId,
                            purchasePrice: item.purchasePrice,
                            salePrice,
                            source,
                        },
                    });
                }

                // 3. створюємо позицію накладної
                await tx.invoiceItem.create({
                    data: {
                        invoiceId: invoice.id,
                        productId: product.id,
                        productName: product.name,
                        quantity: item.quantity,
                        purchasePrice: item.purchasePrice,
                        calculatedPrice: salePrice,
                        roundedPrice: Math.round(salePrice * 2) / 2,
                        priceChanged: !memory,
                    },
                });
            }

            return invoice;
        });
    }

    // Отримати всі накладні, з можливістю фільтрувати за типом
    async findAll(type?: 'INCOME' | 'EXPENSE') {
        const where = type ? { type: type as InvoiceType } : {};
        return this.prisma.invoice.findMany({
            where,
            include: { items: true, agent: true, photos: true },
            orderBy: { invoiceDate: 'desc' },
        });
    }

    // Отримати одну накладну по ID
    async findOne(id: number) {
        return this.prisma.invoice.findUnique({
            where: { id },
            include: { items: true, agent: true, photos: true },
        });
    }
}
