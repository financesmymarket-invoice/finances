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
exports.PriceMemoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PriceMemoryService = class PriceMemoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.productPriceMemory.create({ data: dto });
    }
    findAll() {
        return this.prisma.productPriceMemory.findMany();
    }
    findOne(id) {
        return this.prisma.productPriceMemory.findUnique({ where: { id } });
    }
    async update(agentId, productId, purchasePrice, price) {
        const res = await this.prisma.productPriceMemory.findFirst({
            where: {
                productId
            }
        });
        console.log('res', res);
        console.log('agentId', agentId);
        console.log('productId', productId);
        console.log('purchasePrice', purchasePrice);
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
    remove(id) {
        return this.prisma.productPriceMemory.delete({ where: { id } });
    }
};
exports.PriceMemoryService = PriceMemoryService;
exports.PriceMemoryService = PriceMemoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PriceMemoryService);
//# sourceMappingURL=price-memory.service.js.map