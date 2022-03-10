import * as mongoose from 'mongoose';
import config from '../config/keys';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.mongoURI),
  },
];
