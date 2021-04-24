import dotenv from 'dotenv';

import { version } from '../../package.json';

import EnvironmentType from '../enums/state/environment-type';

dotenv.config();

const config = {
  version,
  environment: EnvironmentType.PRODUCTION, // PRODUCTION, DEVELOPMENT
  database: {
    prodUri: 'package-sorter.i2bqm.mongodb.net',
    devUri: 'mongodb://127.0.0.1:27017',
    name: 'package-sorter',
    user: 'admin',
    credentials: process.env.DB_CREDENTIALS,
  },
  authentication: {
    jwtSecret: process.env.JWT_AUTH_KEY,
    saltRounds: 10,
  },
  deployment: {
    host: process.env.HOST || '127.0.0.1', // DEMONSTRATION PURPOSES ONLY
    port: process.env.PORT || 3000,
  },
};

export default config;
