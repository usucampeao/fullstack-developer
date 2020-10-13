
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const dbOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        authSource: process.env.MONGO_SCHEMA,  
        bufferMaxEntries: 0,
        bufferCommands: false,
        autoIndex: false,
        keepAlive: true,
        keepAliveInitialDelay: 450000,
        connectTimeoutMS: 30000,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
      };
      return await mongoose.connect(process.env.MONGO_URL, dbOptions);
    }
  },
];
