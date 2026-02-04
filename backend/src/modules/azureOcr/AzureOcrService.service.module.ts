import { Module } from '@nestjs/common';

import { AzureOcrService } from '../azureOcr/AzureOcrService.service';

@Module({
  controllers: [],
  providers: [AzureOcrService],
})
export class AzureOcrServiceModule {}