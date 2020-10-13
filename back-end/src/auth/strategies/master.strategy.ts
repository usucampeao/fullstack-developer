import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class MasterStrategy extends PassportStrategy(Strategy, 'master') {

    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.MASTER_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.authService.validateUserByJwt(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
