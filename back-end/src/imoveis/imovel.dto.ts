export class CreateImovelDto {
    titulo: string;
    descricao: string;
    valor: number;
    area: number;
    cep: number;
    logradouro: string;
    numero?: string;
    complemento?: string;
    bairro: string;
    localidade: string;
    uf: string;
}

export class ImovelDto {
    _id?: string;
    titulo: string;
    descricao: string;
    valor: number;
    area: number;
    cep: number;
    logradouro: string;
    numero?: string;
    complemento?: string;
    bairro: string;
    localidade: string;
    uf: string;
    created_at: string;
    updated_at: string;
    published_at?: string;
    status: boolean;
}