import { Imovel } from './imovel.interface';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CreateImovelDto, ImovelDto } from './imovel.dto';

@Injectable()
export class ImovelService {

    constructor(@Inject('IMOVEL_MODEL') private readonly imovelModel: Model<Imovel>) { }


    /**
     * Método para criar um imóvel
     */
    async create(createImovelDto: CreateImovelDto) {
            return await new this.imovelModel(createImovelDto).save();
    }

    /**
     * Método para retornar todos os imóveis
     */    
    async all(): Promise<ImovelDto[]> {
        return await this.imovelModel.find().lean().exec();
    }

    /**
     * Método para atualizar um imóvel por ID
     */
    async update(id: string, imovelDto: ImovelDto): Promise<Imovel> {
        return await this.imovelModel.findByIdAndUpdate(id,
            { $set: imovelDto },
            { new: true, useFindAndModify: false }
        );
    }

    /**
     * Método para deletar um imóvel por ID
     */    
    async delete(id: string): Promise<Imovel> {
        return await this.imovelModel.findByIdAndDelete(id).exec();
    }

    /**
     * Método para retornar um imóvel por ID
     */
    async get(id: string): Promise<ImovelDto> {
        return await this.imovelModel.findById(id).lean().exec();
    }

}
