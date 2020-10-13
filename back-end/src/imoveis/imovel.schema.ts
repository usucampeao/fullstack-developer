import * as mongoose from 'mongoose';

export const ImovelSchema = new mongoose.Schema({
    titulo: {
        type: String,
        unique: true,
        required: true
    },    
    descricao: {
        type: String,
        required: true
    },    
    valor: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    cep: {
        type: Number,
        required: true
    },    
    logradouro: {
        type: String,
        required: true
    },    
    numero: {
        type: String,
        required: false
    },     
    complemento: {
        type: String,
        required: false
    },    
    localidade: {
        type: String,
        required: true
    },    
    bairro: {
        type: String,
        required: true
    },     
    uf: {
        type: String,
        required: true
    },              
    status: {
        type: Boolean,
        required: true,
        default: true
    },    
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },    
    published_at: {
        type: Date
    },    
}, {
    collection: 'imovel',
});
