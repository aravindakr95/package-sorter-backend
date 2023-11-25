import dotenv from 'dotenv';

import { version } from '../../package.json';

import EnvironmentType from '../enums/state/environment-type';

dotenv.config();

const config = {
  version,
  environment: EnvironmentType.DEVELOPMENT, // PRODUCTION, DEVELOPMENT
  generateToken: process.env.GENERATE_TOKEN,
  database: {
    prodUri: 'db-mongodb-nyc3-01114-63cc4f90.mongo.ondigitalocean.com',
    devUri: 'mongodb://127.0.0.1:27017',
    name: 'rvsort-data',
    user: 'aravindar',
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
