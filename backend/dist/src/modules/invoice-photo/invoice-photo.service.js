"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePhotosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const fs = __importStar(require("fs"));
const AzureOcrService_service_1 = require("../azureOcr/AzureOcrService.service");
const client_1 = require("@prisma/client");
let InvoicePhotosService = class InvoicePhotosService {
    prisma;
    azureOcrService;
    constructor(prisma, azureOcrService) {
        this.prisma = prisma;
        this.azureOcrService = azureOcrService;
    }
    async createFromPhoto(params) {
        const { file, agentId, type } = params;
        const agent = await this.prisma.agent.findUnique({ where: { id: agentId } });
        if (!agent)
            throw new Error("Agent not found");
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
            if (parsedItems.length === 0)
                throw new Error("Не вдалося розпізнати позиції");
            const enrichedItems = [];
            for (const item of parsedItems) {
                let product = await this.prisma.product.findFirst({ where: { name: item.productName } });
                if (!product) {
                    product = await this.prisma.product.create({
                        data: {
                            name: item.productName,
                            agentId: agentId,
                        },
                    });
                }
                console.log('product.name', product.name);
                const purchaseUnitPrice = item.unitType === "BOX" && item.boxSize
                    ? Math.round(item.purchasePrice / item.boxSize)
                    : item.purchasePrice;
                let memory = await this.prisma.productPriceMemory.findUnique({
                    where: {
                        productId_agentId_purchasePrice: {
                            productId: product.id,
                            agentId,
                            purchasePrice: purchaseUnitPrice,
                        },
                    },
                });
                console.log('memory', memory);
                const saleUnitPrice = memory
                    ? memory.salePrice
                    : Math.round(purchaseUnitPrice * (1 + agent.markupPercent / 100));
                if (!memory) {
                    memory = await this.prisma.productPriceMemory.create({
                        data: {
                            productId: product.id,
                            agentId,
                            purchasePrice: purchaseUnitPrice,
                            salePrice: saleUnitPrice,
                            source: client_1.PriceSource.AUTO,
                        },
                    });
                }
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
            const createdItems = await this.createInvoiceItems(invoice.id, enrichedItems);
            await this.savePriceMemory(enrichedItems, agentId);
            await this.prisma.invoicePhoto.update({ where: { id: photo.id }, data: { processed: true } });
            if (fs.existsSync(filePath))
                fs.unlinkSync(filePath);
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
                    purchasePrice: Number(item.purchasePrice),
                    purchasePricePerUnit: item.purchasePricePerUnit ? Number(item.purchasePricePerUnit) : null,
                    calculatedPrice: Number(item.calculatedPrice),
                    roundedPrice: Number(item.roundedPrice),
                    priceChanged: item.priceChanged,
                    purchasePriceChanged: item.purchasePriceChanged,
                })),
                photo: { id: photo.id, processed: true },
            };
        }
        catch (error) {
            if (fs.existsSync(filePath))
                fs.unlinkSync(filePath);
            console.error("Помилка:", error);
            throw error;
        }
    }
    async createInvoiceItems(invoiceId, items) {
        const INT4_MAX = 2_000_000_000;
        return this.prisma.$transaction(items.map(item => {
            let unitPriceCents = item.purchasePricePerUnit;
            let quantity = item.quantity;
            if (unitPriceCents <= 0 || quantity <= 0) {
                throw new Error(`[INVALID DATA] price=${unitPriceCents}, qty=${quantity}`);
            }
            const maxAllowedQty = Math.floor(INT4_MAX / unitPriceCents);
            if (quantity > maxAllowedQty) {
                console.warn(`[CLAMP] quantity ${quantity} → ${maxAllowedQty} (price=${unitPriceCents})`);
                quantity = maxAllowedQty;
            }
            let purchasePriceToStore;
            if (item.unitType === 'BOX' && item.boxSize) {
                purchasePriceToStore = item.purchasePrice;
            }
            else {
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
                    boxesCount: item.unitType === 'BOX' && item.boxSize
                        ? Math.floor(quantity / item.boxSize)
                        : null,
                    purchasePricePerUnit: unitPriceCents,
                    purchasePrice: purchasePriceToStore,
                    calculatedPrice: item.calculatedPrice,
                    roundedPrice: item.roundedPrice,
                    priceChanged: item.priceChanged,
                    purchasePriceChanged: item.purchasePriceChanged,
                },
            });
        }));
    }
    async savePriceMemory(items, agentId) {
        for (const item of items) {
            if (!item.productId || !item.priceChanged)
                continue;
            await this.prisma.productPriceMemory.upsert({
                where: {
                    productId_agentId_purchasePrice: {
                        productId: item.productId,
                        agentId,
                        purchasePrice: item.purchasePricePerUnit,
                    },
                },
                create: {
                    productId: item.productId,
                    agentId,
                    purchasePrice: item.purchasePricePerUnit,
                    salePrice: item.calculatedPrice,
                    source: client_1.PriceSource.MANUAL,
                },
                update: {
                    salePrice: item.calculatedPrice,
                    source: client_1.PriceSource.MANUAL,
                },
            });
        }
    }
};
exports.InvoicePhotosService = InvoicePhotosService;
exports.InvoicePhotosService = InvoicePhotosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        AzureOcrService_service_1.AzureOcrService])
], InvoicePhotosService);
//# sourceMappingURL=invoice-photo.service.js.map