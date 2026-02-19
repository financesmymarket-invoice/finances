"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePhotoModule = void 0;
const common_1 = require("@nestjs/common");
const invoice_photo_controller_1 = require("./invoice-photo.controller");
const invoice_photo_service_1 = require("./invoice-photo.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
const AzureOcrService_service_1 = require("../azureOcr/AzureOcrService.service");
let InvoicePhotoModule = class InvoicePhotoModule {
};
exports.InvoicePhotoModule = InvoicePhotoModule;
exports.InvoicePhotoModule = InvoicePhotoModule = __decorate([
    (0, common_1.Module)({
        controllers: [invoice_photo_controller_1.InvoicePhotosController],
        providers: [invoice_photo_service_1.InvoicePhotosService, prisma_service_1.PrismaService, AzureOcrService_service_1.AzureOcrService],
    })
], InvoicePhotoModule);
//# sourceMappingURL=invoice-photo.module.js.map