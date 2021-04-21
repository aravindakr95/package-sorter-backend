import express from 'express';

import packageController from '../package/package-controller';

import authenticateJWT from "../middlewares/auth-jwt";

const packageRouter = express.Router();

packageRouter.post('/upload',
    authenticateJWT,
    (req, res) => {
        packageController(req, res);
    });

packageRouter.get('/',
    authenticateJWT,
    (req, res) => {
        packageController(req, res);
    });

packageRouter.delete('/delete',
    authenticateJWT,
    (req, res) => {
        packageController(req, res);
    });

export default packageRouter;
