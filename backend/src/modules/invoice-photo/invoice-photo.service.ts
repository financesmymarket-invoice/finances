import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as fs from 'fs';
import { AzureOcrService } from '../azureOcr/AzureOcrService.service';
import { InvoiceItem, InvoiceType, PriceSource } from '@prisma/client';

interface ParsedInvoiceItemInternal {
  productName: string;
  quantity: number; // фінальна кількість в штуках
  purchasePrice: number; // ціна за одиницю (шт або ящик) В КОПІЙКАХ
  unitType: 'PIECE' | 'BOX';
  boxSize?: number; // якщо BOX — скільки штук в ящику
}

interface ParsedItemWithPriceInfo extends ParsedInvoiceItemInternal {
  productId?: number;
  purchasePricePerUnit: number; // розрахована ціна за штуку В КОПІЙКАХ
  calculatedPrice: number; // продажна ціна за штуку В КОПІЙКАХ
  roundedPrice: number; // total продажу В КОПІЙКАХ
  priceChanged: boolean; // чи нова позиція
  purchasePriceChanged: boolean; // чи змінилася закупівельна ціна
}

@Injectable()
export class InvoicePhotosService {
  constructor(
    private prisma: PrismaService,
    private azureOcrService: AzureOcrService,
  ) { }

  async createFromPhoto(params: { file: Express.Multer.File; agentId: number; type: InvoiceType }) {
    const { file, agentId, type } = params;
    const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) throw new Error("Agent not found");

    const filePath = `/tmp/${Date.now()}-${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    try {
      // 1️⃣ Створюємо накладну
      const invoice = await this.prisma.invoice.create({
        data: {
          agentId,
          type,
          invoiceDate: new Date(),
          markupPercent: agent.markupPercent,
        },
      });

      // 2️⃣ Додаємо фото
      const photo = await this.prisma.invoicePhoto.create({
        data: { invoiceId: invoice.id, url: filePath, processed: false },
      });

      // 3️⃣ OCR → отримуємо сирі позиції
      const parsedItems = await this.azureOcrService.extractInvoiceItems(filePath, agentId);
      if (parsedItems.length === 0) throw new Error("Не вдалося розпізнати позиції");

      const enrichedItems: ParsedItemWithPriceInfo[] = [];

      for (const item of parsedItems) {
        // знайти або створити продукт
        let product = await this.prisma.product.findFirst({ where: { name: item.productName } });
        if (!product) {
          product = await this.prisma.product.create({ data: { name: item.productName } });
        }
        console.log('product.name', product.name)
        // закупка за одиницю
        const purchaseUnitPrice =
          item.unitType === "BOX" && item.boxSize
            ? Math.round(item.purchasePrice / item.boxSize)
            : item.purchasePrice;

        // перевіряємо memory
        let memory = await this.prisma.productPriceMemory.findUnique({
          where: {
            productId_agentId_purchasePrice: {
              productId: product.id,
              agentId,
              purchasePrice: purchaseUnitPrice,
            },
          },
        });
        console.log('memory', memory)
        // продажна ціна: або беремо memory, або створюємо
        const saleUnitPrice = memory
          ? memory.salePrice
          : Math.round(purchaseUnitPrice * (1 + agent.markupPercent / 100));

        // якщо memory нема — створюємо одразу
        if (!memory) {
          memory = await this.prisma.productPriceMemory.create({
            data: {
              productId: product.id,
              agentId,
              purchasePrice: purchaseUnitPrice,
              salePrice: saleUnitPrice,
              source: PriceSource.AUTO,
            },
          });
        }

        // total
        const totalSalePrice = saleUnitPrice * item.quantity;

        enrichedItems.push({
          ...item,
          productId: product.id,
          purchasePricePerUnit: purchaseUnitPrice,
          calculatedPrice: saleUnitPrice,
          roundedPrice: totalSalePrice,
          priceChanged: false,
          purchasePriceChanged: false,
        });
      }

      // 4️⃣ Записуємо позиції в InvoiceItems
      const createdItems = await this.createInvoiceItems(invoice.id, enrichedItems);

      // 5️⃣ Оновлюємо memory
      await this.savePriceMemory(enrichedItems, agentId);

      // 6️⃣ Позначаємо фото як оброблене
      await this.prisma.invoicePhoto.update({ where: { id: photo.id }, data: { processed: true } });

      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      // 7️⃣ Віддаємо фронтенду
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
          purchasePriceChanged: item.purchasePriceChanged,
        })),
        photo: { id: photo.id, processed: true },
      };
    } catch (error) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      console.error("Помилка:", error);
      throw error;
    }
  }


  private async createInvoiceItems(
    invoiceId: number,
    items: ParsedItemWithPriceInfo[],
  ) {
    const INT4_MAX = 2_000_000_000;

    return this.prisma.$transaction(
      items.map(item => {
        let unitPriceCents = item.purchasePricePerUnit; // ціна за ШТУКУ
        let quantity = item.quantity; // кількість ШТУК

        // 🛑 жорсткий захист від OCR-космосу
        if (unitPriceCents <= 0 || quantity <= 0) {
          throw new Error(`[INVALID DATA] price=${unitPriceCents}, qty=${quantity}`);
        }

        // 🔧 якщо сума не влазить в INT4 — зменшуємо quantity
        const maxAllowedQty = Math.floor(INT4_MAX / unitPriceCents);

        if (quantity > maxAllowedQty) {
          console.warn(
            `[CLAMP] quantity ${quantity} → ${maxAllowedQty} (price=${unitPriceCents})`,
          );
          quantity = maxAllowedQty;
        }

        // ✅ purchasePrice залежить від unitType
        let purchasePriceToStore: number;

        if (item.unitType === 'BOX' && item.boxSize) {
          // Для ящиків зберігаємо ціну ЗА ЯЩИК (оригінальну з OCR)
          purchasePriceToStore = item.purchasePrice;
        } else {
          // Для штук зберігаємо ціну ЗА ШТУКУ
          purchasePriceToStore = unitPriceCents;
        }

        console.log(`[CREATE] ${item.productName}: ${quantity}шт @ ${unitPriceCents}коп/шт, purchasePrice=${purchasePriceToStore}коп`);

        return this.prisma.invoiceItem.create({
          data: {
            invoiceId,
            productId: item.productId ?? null,
            productName: item.productName,
            unitType: item.unitType,
            boxSize: item.boxSize ?? null,
            quantity,

            boxesCount:
              item.unitType === 'BOX' && item.boxSize
                ? Math.floor(quantity / item.boxSize)
                : null,

            purchasePricePerUnit: unitPriceCents, // завжди ціна за ШТУКУ
            purchasePrice: purchasePriceToStore, // ціна за ящик (BOX) або штуку (PIECE)

            calculatedPrice: item.calculatedPrice, // продажна за штуку
            roundedPrice: item.roundedPrice, // total продажу
            priceChanged: item.priceChanged,
            purchasePriceChanged: item.purchasePriceChanged,
          },
        });
      }),
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
            purchasePrice: item.purchasePricePerUnit, // зберігаємо ціну за штуку
          },
        },
        create: {
          productId: item.productId,
          agentId,
          purchasePrice: item.purchasePricePerUnit, // ціна за штуку
          salePrice: item.calculatedPrice, // продажна за штуку
          source: PriceSource.MANUAL, // або AUTO
        },
        update: {
          salePrice: item.calculatedPrice,
          source: PriceSource.MANUAL, // якщо користувач редагував
        },
      });

    }
  }
}