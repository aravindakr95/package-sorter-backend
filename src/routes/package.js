import express from 'express';

import packageController from '../package/package-controller';

import authenticateJWT from '../middlewares/auth-jwt';

const packageRouter = express.Router();

packageRouter.post('/upload',
  authenticateJWT,
  packageController);

packageRouter.get('/:userId',
  authenticateJWT,
  packageController);

packageRouter.put('/:userId',
  authenticateJWT,
  packageController);

packageRouter.delete('/:userId/delete',
  authenticateJWT,
  packageController);

export default packageRouter;
