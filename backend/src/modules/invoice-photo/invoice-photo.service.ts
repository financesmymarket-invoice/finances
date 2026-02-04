import { InvoiceItem, InvoiceType, PriceSource } from 'src/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as fs from 'fs';
import { AzureOcrService } from '../azureOcr/AzureOcrService.service';

interface ParsedInvoiceItemInternal {
  productName: string;
  quantity: number;
  purchasePrice: number;
  unitType: 'PIECE' | 'BOX';
  boxSize?: number;
}

interface ParsedItemWithPriceInfo extends ParsedInvoiceItemInternal {
  productId?: number;
  calculatedPrice: number;
  roundedPrice: number;
  priceChanged: boolean;
}

@Injectable()
export class InvoicePhotosService {
  constructor(
    private prisma: PrismaService,
    private azureOcrService: AzureOcrService,
  ) { }

  async createFromPhoto(params: {
    file: Express.Multer.File;
    agentId: number;
    type: InvoiceType;
  }) {
    const { file, agentId, type } = params;

    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) throw new Error('Agent not found');

    const filePath = `/tmp/${Date.now()}-${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    try {
      const invoice = await this.prisma.invoice.create({
        data: {
          agentId,
          type,
          invoiceDate: new Date(),
          markupPercent: agent.markupPercent,
        },
      });

      const photo = await this.prisma.invoicePhoto.create({
        data: { invoiceId: invoice.id, url: filePath, processed: false },
      });

      const parsedItems = await this.azureOcrService.extractInvoiceItems(filePath, agentId);

      if (parsedItems.length === 0) {
        throw new Error('Не вдалося розпізнати позиції');
      }

      const itemsWithPrices = await this.calculatePricesAndDetectChanges(
        parsedItems,
        agentId,
        agent.markupPercent,
      );

      const createdItems = await this.createInvoiceItems(invoice.id, itemsWithPrices);

      await this.savePriceMemory(itemsWithPrices, agentId);

      await this.prisma.invoicePhoto.update({
        where: { id: photo.id },
        data: { processed: true },
      });

      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      return {
        invoice: {
          id: invoice.id,
          agentId: invoice.agentId,
          type: invoice.type,
          invoiceDate: invoice.invoiceDate.toISOString(),
          markupPercent: invoice.markupPercent,
        },
        items: createdItems.map(item => ({
          id: item.id,
          productName: item.productName,
          unitType: item.unitType,
          boxSize: item.boxSize,
          quantity: item.quantity,
          boxesCount: item.boxesCount ?? null,
          purchasePrice: Number(item.purchasePrice) / 100,
          purchasePricePerUnit: item.purchasePricePerUnit ? Number(item.purchasePricePerUnit) / 100 : null,
          calculatedPrice: Number(item.calculatedPrice) / 100,
          roundedPrice: Number(item.roundedPrice) / 100,
          priceChanged: item.priceChanged,
        })),
        photo: { id: photo.id, processed: true },
      };
    } catch (error) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      console.error('Помилка:', error);
      throw error;
    }
  }

  async calculatePricesAndDetectChanges(
    items: ParsedInvoiceItemInternal[],
    agentId: number,
    markupPercent: number,
  ): Promise<ParsedItemWithPriceInfo[]> {
    const result: ParsedItemWithPriceInfo[] = [];

    for (const item of items) {
      let product = await this.prisma.product.findFirst({
        where: { name: item.productName, agentId },
      });

      if (!product) {
        product = await this.prisma.product.create({
          data: { name: item.productName, agentId },
        });
      }

      const priceMemory = await this.prisma.productPriceMemory.findUnique({
        where: {
          productId_agentId_purchasePrice: {
            productId: product.id,
            agentId,
            purchasePrice: BigInt(Math.round(item.purchasePrice * 100)),
          },
        },
      });

      const calculatedPrice = priceMemory
        ? Number(priceMemory.salePrice) / 100
        : item.purchasePrice * (markupPercent / 100) + item.purchasePrice;

      const roundedPrice = this.roundToHalf(calculatedPrice);

      result.push({
        ...item,
        productId: product.id,
        calculatedPrice,
        roundedPrice,
        priceChanged: !priceMemory,
      });
    }

    return result;
  }

  async createInvoiceItems(invoiceId: number, items: ParsedItemWithPriceInfo[]): Promise<InvoiceItem[]> {
    return this.prisma.$transaction(
      items.map(item =>
        this.prisma.invoiceItem.create({
          data: {
            invoiceId,
            productId: item.productId ?? null,
            productName: item.productName,
            unitType: item.unitType,
            boxSize: item.boxSize,
            quantity: item.quantity,
            boxesCount: item.unitType === 'BOX' && item.boxSize
              ? Math.floor(item.quantity / item.boxSize)
              : null,
            purchasePrice: BigInt(Math.round(item.purchasePrice * 100)),
            purchasePricePerUnit: item.unitType === 'BOX' && item.boxSize
              ? BigInt(Math.round((item.purchasePrice / item.boxSize) * 100))
              : BigInt(Math.round(item.purchasePrice * 100)),
            calculatedPrice: BigInt(Math.round(item.calculatedPrice * 100)),
            roundedPrice: BigInt(Math.round(item.roundedPrice * 100)),
            priceChanged: item.priceChanged,
          },
        }),
      ),
    );
  }

  private async savePriceMemory(items: ParsedItemWithPriceInfo[], agentId: number) {
    for (const item of items) {
      if (!item.productId || !item.priceChanged) continue;

      await this.prisma.productPriceMemory.upsert({
        where: {
          productId_agentId_purchasePrice: {
            productId: item.productId,
            agentId,
            purchasePrice: BigInt(Math.round(item.purchasePrice * 100)),
          },
        },
        create: {
          productId: item.productId,
          agentId,
          purchasePrice: BigInt(Math.round(item.purchasePrice * 100)),
          salePrice: BigInt(Math.round(item.roundedPrice * 100)),
          source: PriceSource.AUTO,
        },
        update: {
          salePrice: BigInt(Math.round(item.roundedPrice * 100)),
          source: PriceSource.AUTO,
        },
      });
    }
  }

  async updateItemPrice(itemId: number, newRoundedPrice: number) {
    const item = await this.prisma.invoiceItem.findUnique({
      where: { id: itemId },
      include: { invoice: true },
    });

    if (!item) throw new Error('Item not found');

    await this.prisma.invoiceItem.update({
      where: { id: itemId },
      data: {
        roundedPrice: BigInt(Math.round(newRoundedPrice * 100)),
        priceChanged: false,
      },
    });

    if (item.productId) {
      await this.prisma.productPriceMemory.upsert({
        where: {
          productId_agentId_purchasePrice: {
            productId: item.productId,
            agentId: item.invoice.agentId,
            purchasePrice: item.purchasePrice,
          },
        },
        create: {
          productId: item.productId,
          agentId: item.invoice.agentId,
          purchasePrice: item.purchasePrice,
          salePrice: BigInt(Math.round(newRoundedPrice * 100)),
          source: PriceSource.MANUAL,
        },
        update: {
          salePrice: BigInt(Math.round(newRoundedPrice * 100)),
          source: PriceSource.MANUAL,
        },
      });
    }
  }

  async getInvoiceWithItems(invoiceId: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { items: true, agent: true, photos: true },
    });

    if (!invoice) throw new Error('Invoice not found');

    return {
      invoice: {
        id: invoice.id,
        agentId: invoice.agentId,
        type: invoice.type,
        invoiceDate: invoice.invoiceDate.toISOString(),
        markupPercent: invoice.markupPercent,
        agent: invoice.agent,
      },
      items: invoice.items.map(item => ({
        ...item,
        quantity: item.quantity,
        boxesCount: item.boxesCount ?? null,
        purchasePrice: Number(item.purchasePrice) / 100,
        purchasePricePerUnit: item.purchasePricePerUnit ? Number(item.purchasePricePerUnit) / 100 : null,
        calculatedPrice: Number(item.calculatedPrice) / 100,
        roundedPrice: Number(item.roundedPrice) / 100,
      })),
      photos: invoice.photos,
    };
  }

  private roundToHalf(price: number): number {
    return Math.round(price * 2) / 2;
  }
}