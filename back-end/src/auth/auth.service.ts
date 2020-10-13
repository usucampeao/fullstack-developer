import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../users/user.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }


    /**
     * Método para autenticação (login), verifica se existe email e depois verifica match com senha
     */
    async validateUserByPassword(loginAttempt: LoginUserDto) {
        const userToAttempt = await this.usersService.findOneByEmail(
            loginAttempt.email,
        );
        const isMatch = userToAttempt ? await bcrypt.compare(
            loginAttempt.password,
            userToAttempt.password,
        ) : false;
        
        if (isMatch) {
            return this.createJwtPayload(userToAttempt);
        } else {
            throw new UnauthorizedException();
        }
    }

    /**
     * Método para autenticação OK: retorna jsonwebtoken criado com payload e informações do usuário
     */
    createJwtPayload(user: any) {
        const data: any = {
            id: user._id,
            email: user.email,
            name: user.name,
            master: user.isMaster
        };

        const jwt = this.jwtService.sign(data, { secret: user.isMaster ? process.env.MASTER_SECRET : process.env.DEFAULT_SECRET });

        return {
            user: data,
            expiresIn: 3600,
            accessToken: jwt,
        };
    }

    /**
     * Método solicitado para as estratégias definidas no AuthGuard dos endpoints: 
     * verifica se o payload contem usuário válido 
     */
    async validateUserByJwt(payload: any) {
        const user = await this.usersService.findOneByEmail(payload.email);
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }    
}
