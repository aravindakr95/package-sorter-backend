import express from 'express';

import authController from '../auth/auth-controller';

import { validate, fieldStateChecker } from '../middlewares/field-validator';
import validateGenerateToken from '../middlewares/token-validator';

const authRouter = express.Router();

authRouter.post('/register',
  validate('auth', '/register', 'POST'),
  validateGenerateToken,
  fieldStateChecker,
  authController);

authRouter.post('/login',
  validate('auth', '/login', 'POST'),
  fieldStateChecker,
  authController);

export default authRouter;
