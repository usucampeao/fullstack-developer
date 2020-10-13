import { MasterStrategy } from './strategies/master.strategy';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DefaultStrategy } from './strategies/default.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'default_user' });

@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secret: process.env.DEFAULT_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    UserModule,
  ],
  exports: [passportModule],
  controllers: [AuthController],
  providers: [AuthService, DefaultStrategy, MasterStrategy],
})
export class AuthModule {}
