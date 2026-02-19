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
exports.UpdateInvoiceItemPriceDto = exports.UpdateInvoiceItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_2 = require("@nestjs/swagger");
const class_validator_2 = require("class-validator");
class UpdateInvoiceItemDto {
    quantity;
    purchasePrice;
    calculatedPrice;
    roundedPrice;
    priceChanged;
}
exports.UpdateInvoiceItemDto = UpdateInvoiceItemDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)(),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], UpdateInvoiceItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)(),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], UpdateInvoiceItemDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)(),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], UpdateInvoiceItemDto.prototype, "calculatedPrice", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)(),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsNumber)(),
    __metadata("design:type", Number)
], UpdateInvoiceItemDto.prototype, "roundedPrice", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)(),
    (0, class_validator_2.IsOptional)(),
    (0, class_validator_2.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateInvoiceItemDto.prototype, "priceChanged", void 0);
class UpdateInvoiceItemPriceDto {
    calculatedPrice;
}
exports.UpdateInvoiceItemPriceDto = UpdateInvoiceItemPriceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ціна за одиницю в копійках' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateInvoiceItemPriceDto.prototype, "calculatedPrice", void 0);
//# sourceMappingURL=update-invoice-item.dto.js.map