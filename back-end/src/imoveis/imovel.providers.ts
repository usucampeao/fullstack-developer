import { Connection } from 'mongoose';
import { ImovelSchema } from './imovel.schema';

export const imovelProviders = [
  {
    provide: 'IMOVEL_MODEL',
    useFactory: (connection: Connection) => connection.model('imovel', ImovelSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];