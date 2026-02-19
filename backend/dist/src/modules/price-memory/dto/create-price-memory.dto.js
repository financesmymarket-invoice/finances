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
exports.CreatePriceMemoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreatePriceMemoryDto {
    productId;
    agentId;
    purchasePrice;
    salePrice;
    source;
}
exports.CreatePriceMemoryDto = CreatePriceMemoryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreatePriceMemoryDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreatePriceMemoryDto.prototype, "agentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreatePriceMemoryDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreatePriceMemoryDto.prototype, "salePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PriceSource }),
    __metadata("design:type", String)
], CreatePriceMemoryDto.prototype, "source", void 0);
//# sourceMappingURL=create-price-memory.dto.js.map