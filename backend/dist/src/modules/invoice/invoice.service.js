"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let InvoicesService = class InvoicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.$transaction(async (tx) => {
            const agent = await tx.agent.findUnique({ where: { id: dto.agentId } });
            if (!agent)
                throw new Error("Agent not found");
            const invoice = await tx.invoice.create({
                data: {
                    agentId: dto.agentId,
                    type: dto.type,
                    invoiceDate: new Date(),
                    markupPercent: agent.markupPercent,
                },
            });
            for (const item of dto.items) {
                let product = await tx.product.findFirst({ where: { name: item.productName } });
                if (!product) {
                    product = await tx.product.create({ data: { name: item.productName } });
                }
                const purchaseUnitPrice = item.unitType === "BOX" && item.boxSize
                    ? Math.round(item.purchasePrice / item.boxSize)
                    : item.purchasePrice;
                let memory = await tx.productPriceMemory.findUnique({
                    where: {
                        productId_agentId_purchasePrice: {
                            productId: product.id,
                            agentId: dto.agentId,
                            purchasePrice: purchaseUnitPrice,
                        },
                    },
                });
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
                            source: client_1.PriceSource.AUTO,
                        },
                    });
                }
                const totalSalePrice = saleUnitPrice * item.quantity;
                await tx.invoiceItem.create({
                    data: {
                        invoiceId: invoice.id,
                        productId: product.id,
                        productName: product.name,
                        unitType: item.unitType,
                        boxSize: item.boxSize,
                        quantity: item.quantity,
                        purchasePrice: item.purchasePrice,
                        purchasePricePerUnit: purchaseUnitPrice,
                        calculatedPrice: saleUnitPrice,
                        roundedPrice: totalSalePrice,
                        priceChanged: false,
                        purchasePriceChanged: false,
                    },
                });
            }
            return invoice;
        });
    }
    async findAll(type) {
        const where = type ? { type: type } : {};
        return this.prisma.invoice.findMany({
            where,
            include: { items: true, agent: true, photos: true },
            orderBy: { invoiceDate: 'desc' },
        });
    }
    async findOne(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { items: true, agent: true, photos: true },
        });
        if (!invoice)
            return null;
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
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoice.service.js.map