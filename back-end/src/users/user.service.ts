import { User } from './user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, Users } from './user.dto';

@Injectable()
export class UserService {

    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) { }

    /**
     * Método para criação de usuário
     */
    async create(createUserDto: CreateUserDto) {
        if (await this.findOneByEmail(createUserDto.email)) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Usuário/email já existe',
            }, HttpStatus.FORBIDDEN);
        } else {
            createUserDto.password = await this.createNewPasswordHash(createUserDto.password);
            return await new this.userModel(createUserDto).save();
        }

    }

    /**
     * Método para buscar usuário por email
     */
    async findOneByEmail(email: string): Promise<any> {
        return await this.userModel.findOne({ email }).lean().exec();
    }

    /**
     * Método para atualizar um usuário por ID
     */
    async update(userID: string, userDto: User): Promise<User> {
        if (userDto.password) {
            userDto.password = await this.createNewPasswordHash(userDto.password);
        }
        return await this.userModel.findByIdAndUpdate(userID, { $set: userDto }, {
            new: true, useFindAndModify: false,
        });
    }

    /**
     * Método para deletar um usuário por ID
     */
    async deleteById(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id).exec();
    }


    /**
     * Método para retornar um usuário por ID
     */
    async getById(userId: string): Promise<Users> {
        return await this.userModel.findById(userId).lean().exec();
    }

    /**
     * Método para encryptar senha
     */
    async createNewPasswordHash(pass: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pass, salt);
    }
}
