import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, ...userProviders]
})
export class UserModule {}
