import { Module } from '@nestjs/common';
import { ImovelController } from './imovel.controller';
import { ImovelService } from './imovel.service';
import { DatabaseModule } from '../database/database.module';
import { imovelProviders } from './imovel.providers';

@Module({
  imports: [DatabaseModule],
  exports: [ImovelService],
  controllers: [ImovelController],
  providers: [ImovelService, ...imovelProviders]
})
export class ImovelModule {}
