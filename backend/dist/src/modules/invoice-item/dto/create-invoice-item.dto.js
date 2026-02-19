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
exports.CreateInvoiceItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateInvoiceItemDto {
    invoiceId;
    productId;
    productName;
    unitType;
    boxSize;
    quantity;
    boxesCount;
    purchasePrice;
    purchasePricePerUnit;
    calculatedPrice;
    roundedPrice;
    priceChanged;
    purchasePriceChanged;
}
exports.CreateInvoiceItemDto = CreateInvoiceItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "invoiceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 42, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Мор Каштан 70г' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvoiceItemDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.UnitType, example: client_1.UnitType.PIECE }),
    (0, class_validator_1.IsEnum)(client_1.UnitType),
    __metadata("design:type", String)
], CreateInvoiceItemDto.prototype, "unitType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 32, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "boxSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.5, description: 'Кількість в штуках (для продажу)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false, description: 'Кількість ящиків (якщо BOX)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "boxesCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120.50, description: 'Закупівельна ціна за одиницю (шт або ящик)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.75, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "purchasePricePerUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150.00, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "calculatedPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150.00, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "roundedPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateInvoiceItemDto.prototype, "priceChanged", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateInvoiceItemDto.prototype, "purchasePriceChanged", void 0);
//# sourceMappingURL=create-invoice-item.dto.js.map