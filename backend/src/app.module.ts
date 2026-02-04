import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { InvoiceItemModule } from './modules/invoice-item/invoice-item.module';
import { AgentsModule } from './modules/agents/agents.module';
import { InvoicePhotoModule } from './modules/invoice-photo/invoice-photo.module';
import { PriceMemoryModule } from './modules/price-memory/price-memory.module';
import { ProductModule } from './modules/product/product.module';
import { AzureOcrServiceModule } from './modules/azureOcr/AzureOcrService.service.module';

@Module({
  imports: [
    InvoiceModule,
    InvoiceItemModule,
    AgentsModule,
    InvoicePhotoModule,
    PriceMemoryModule,
    ProductModule,
    AzureOcrServiceModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
