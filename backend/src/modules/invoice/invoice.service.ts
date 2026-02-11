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
            const agent = await tx.agent.findUnique({ where: { id: dto.agentId } });
            if (!agent) throw new Error("Agent not found");

            // створюємо накладну
            const invoice = await tx.invoice.create({
                data: {
                    agentId: dto.agentId,
                    type: dto.type as InvoiceType,
                    invoiceDate: new Date(),
                    markupPercent: agent.markupPercent,
                },
            });

            for (const item of dto.items) {
                // знаходимо або створюємо продукт
                let product = await tx.product.findFirst({ where: { name: item.productName } });
                if (!product) {
                    product = await tx.product.create({ data: { name: item.productName } });
                }
console.log('product.name', product.name)
                // закупка за 1 одиницю
                const purchaseUnitPrice =
                    item.unitType === "BOX" && item.boxSize
                        ? Math.round(item.purchasePrice / item.boxSize)
                        : item.purchasePrice;

                // перевіряємо memory
                let memory = await tx.productPriceMemory.findUnique({
                    where: {
                        productId_agentId_purchasePrice: {
                            productId: product.id,
                            agentId: dto.agentId,
                            purchasePrice: purchaseUnitPrice,
                        },
                    },
                });
console.log('memory', memory)
                // якщо memory є — беремо її продажну ціну, якщо немає — розраховуємо і створюємо
                const saleUnitPrice = memory
                    ? memory.salePrice
                    : Math.round(purchaseUnitPrice * (1 + agent.markupPercent / 100));

                if (!memory) {
                    memory = await tx.productPriceMemory.create({
                        data: {
                            productId: product.id,
                            agentId: dto.agentId,
                            purchasePrice: purchaseUnitPrice,
                            salePrice: saleUnitPrice,
                            source: PriceSource.AUTO,
                        },
                    });
                }

                const totalSalePrice = saleUnitPrice * item.quantity;

                // створюємо позицію накладної з актуальними цінами
                await tx.invoiceItem.create({
                    data: {
                        invoiceId: invoice.id,
                        productId: product.id,
                        productName: product.name,
                        unitType: item.unitType,
                        boxSize: item.boxSize,
                        quantity: item.quantity,
                        purchasePrice: item.purchasePrice,           // за ящик
                        purchasePricePerUnit: purchaseUnitPrice,     // за од.
                        calculatedPrice: saleUnitPrice,              // за од.
                        roundedPrice: totalSalePrice,                // total
                        priceChanged: false,                          // бо беремо з memory
                        purchasePriceChanged: false,
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
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { items: true, agent: true, photos: true },
        });
       
        if (!invoice) return null;

        return {
            ...invoice,
            items: invoice.items.map(item => ({
                ...item,
                purchasePrice: item.purchasePrice.toString(),
                purchasePricePerUnit: item.purchasePricePerUnit && item.purchasePricePerUnit.toString(),
                calculatedPrice: item.calculatedPrice.toString(),
                roundedPrice: item.roundedPrice.toString(),
            })),
        };
    }

}
