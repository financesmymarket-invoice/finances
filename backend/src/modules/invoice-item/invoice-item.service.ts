import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto, UpdateInvoiceItemPriceDto } from './dto/update-invoice-item.dto';

@Injectable()
export class InvoiceItemsService {
    constructor(private prisma: PrismaService) { }

    // Створення позиції накладної
    create(dto: CreateInvoiceItemDto) {
        return this.prisma.invoiceItem.create({
            data: {
                invoiceId: dto.invoiceId,
                productId: dto.productId,
                productName: dto.productName,
                quantity: dto.quantity,
                purchasePrice: dto.purchasePrice,
                unitType: dto.unitType,
                calculatedPrice: dto.calculatedPrice ?? dto.purchasePrice,
                roundedPrice: dto.roundedPrice ?? Math.round(dto.purchasePrice * 2) / 2,
                priceChanged: dto.priceChanged ?? false,
            },
        });
    }

    // Отримати всі позиції
    findAll() {
        return this.prisma.invoiceItem.findMany();
    }

    // Отримати одну позицію по ID
    findOne(id: number) {
        return this.prisma.invoiceItem.findUnique({ where: { id } });
    }

    // Оновлення позиції
    update(id: number, dto: UpdateInvoiceItemDto) {
        const data: any = {};
        if (dto.quantity !== undefined) data.quantity = dto.quantity;
        if (dto.purchasePrice !== undefined) data.purchasePrice = dto.purchasePrice;
        if (dto.calculatedPrice !== undefined) data.calculatedPrice = dto.calculatedPrice;
        if (dto.quantity && dto.calculatedPrice) data.roundedPrice = dto.calculatedPrice * dto.quantity;
        if (dto.priceChanged !== undefined) data.priceChanged = dto.priceChanged;

        return this.prisma.invoiceItem.update({
            where: { id },
            data: {
                quantity: dto.quantity,
                calculatedPrice: dto.calculatedPrice,
                roundedPrice:data.roundedPrice,
                priceChanged: true,
            },
        });
    }

    // Видалення позиції
    remove(id: number) {
        return this.prisma.invoiceItem.delete({ where: { id } });
    }

    async updatePrice(id: number, dto: UpdateInvoiceItemPriceDto) {
        const item = await this.prisma.invoiceItem.findUnique({ where: { id } });
        if (!item) throw new Error('Item not found');

        const roundedPrice = dto.calculatedPrice * item.quantity; // обчислюємо на бекенді

        return this.prisma.invoiceItem.update({
            where: { id },
            data: {
                calculatedPrice: dto.calculatedPrice,
                roundedPrice,
                priceChanged: true,
            },
        });
    }

}
