import packageEndpointHandler from './index';

import HttpResponseType from '../enums/http/http-response-type';

import { successResponse, errorResponse } from '../helpers/http/response-dispatcher';
import { normalizeRequest } from '../helpers/utilities/normalize-request';

export default function packageController(req, res) {
  const httpRequest = normalizeRequest(req);

  packageEndpointHandler(httpRequest)
    .then(({ data }) => {
      if (data.status) {
        return successResponse(res, data);
      }
      return errorResponse(res, data);
    })
    .catch((error) => {
      errorResponse(res, {
        code: HttpResponseType.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    });
}
