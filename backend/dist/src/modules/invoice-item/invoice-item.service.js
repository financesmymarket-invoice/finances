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
exports.InvoiceItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let InvoiceItemsService = class InvoiceItemsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
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
    findAll() {
        return this.prisma.invoiceItem.findMany();
    }
    findOne(id) {
        return this.prisma.invoiceItem.findUnique({ where: { id } });
    }
    update(id, dto) {
        const data = {};
        if (dto.quantity !== undefined)
            data.quantity = dto.quantity;
        if (dto.purchasePrice !== undefined)
            data.purchasePrice = dto.purchasePrice;
        if (dto.calculatedPrice !== undefined)
            data.calculatedPrice = dto.calculatedPrice;
        if (dto.quantity && dto.calculatedPrice)
            data.roundedPrice = dto.calculatedPrice * dto.quantity;
        if (dto.priceChanged !== undefined)
            data.priceChanged = dto.priceChanged;
        return this.prisma.invoiceItem.update({
            where: { id },
            data: {
                quantity: dto.quantity,
                calculatedPrice: dto.calculatedPrice,
                roundedPrice: data.roundedPrice,
                priceChanged: true,
            },
        });
    }
    remove(id) {
        return this.prisma.invoiceItem.delete({ where: { id } });
    }
    async updatePrice(id, dto) {
        const item = await this.prisma.invoiceItem.findUnique({ where: { id } });
        if (!item)
            throw new Error('Item not found');
        const roundedPrice = dto.calculatedPrice * item.quantity;
        return this.prisma.invoiceItem.update({
            where: { id },
            data: {
                calculatedPrice: dto.calculatedPrice,
                roundedPrice,
                priceChanged: true,
            },
        });
    }
};
exports.InvoiceItemsService = InvoiceItemsService;
exports.InvoiceItemsService = InvoiceItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceItemsService);
//# sourceMappingURL=invoice-item.service.js.map