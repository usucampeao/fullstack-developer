import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-dotenv';
import { ImovelModule } from './imoveis/imovel.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ImovelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
