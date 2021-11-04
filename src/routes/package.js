import express from 'express';

import packageController from '../package/package-controller';

import authenticateJWT from '../middlewares/auth-jwt';

const packageRouter = express.Router();

packageRouter.post('/upload',
  authenticateJWT,
  packageController);

packageRouter.get('/:userId', authenticateJWT);

packageRouter.put('/:userId', authenticateJWT);

packageRouter.delete('/:userId/delete', authenticateJWT);

export default packageRouter;
