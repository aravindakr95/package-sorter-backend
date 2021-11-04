import HttpResponseType from '../enums/http/http-response-type';

import config from '../configs/config';
import loglevel from '../configs/log-level';

import { errorResponse } from '../helpers/http/response-dispatcher';

export default function validateGenerateToken(req, res, next) {
  loglevel.info('[validateGenerateToken]: Start/ End');
  const adminHeader = req.headers['generate-token'];

  if (!adminHeader || adminHeader !== config.generateToken) {
    return errorResponse(res, {
      code: HttpResponseType.AUTH_REQUIRED,
      message: 'Required token is not presented or invalid',
    });
  }

  return next();
}
