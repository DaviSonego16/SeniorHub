// src/external/external.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KitsuApiService } from './services/kitsu-api.service';

@Module({
  imports: [HttpModule],
  providers: [KitsuApiService],
  exports: [KitsuApiService],
})
export class ExternalModule {}
