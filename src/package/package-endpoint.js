import HttpResponseType from '../enums/http/http-response-type';

import customException from '../helpers/utilities/custom-exception';
import { objectHandler } from '../helpers/utilities/normalize-request';
import defaultRouteHandler from '../helpers/http/default-route-handler';

import HttpMethod from '../enums/http/http-method';

export default function makePackageEndPointHandler({ packageList }) {
  async function addPackages(httpRequest) {
    try {
      const packages = httpRequest.body;

      const filterPackages = packages.filter((pkg) => {
        if (pkg.barcode !== '') {
          return pkg;
        }
      });

      await packageList.insertPackages(filterPackages).catch((error) => {
        throw customException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: 'Package details added successful',
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function getPackage(httpRequest) {
    try {
      const { barcode } = httpRequest.queryParams;
      const { userId } = httpRequest.pathParams;
      const packageDetails = await packageList.findPackageByBarcode(userId, barcode).catch((error) => {
        throw customException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        data: packageDetails,
        message: `Package ${barcode} details retrieval successful`,
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function getAllPackages(httpRequest) {
    try {
      const { userId } = httpRequest.pathParams;
      const packageDetails = await packageList.findAllPackages(userId).catch((error) => {
        throw customException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        data: packageDetails,
        message: 'Packages detail retrieval successful',
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function updatePackageStatus(httpRequest) {
    try {
      const { userId } = httpRequest.pathParams;
      const { barcode } = httpRequest.queryParams;
      const { scanStatus } = httpRequest.body;

      const result = await packageList.updatePackageStatus(userId, barcode, scanStatus).catch((error) => {
        throw customException(error.message);
      });

      if (result) {
        return objectHandler({
          status: HttpResponseType.SUCCESS,
          message: `Packages status for barcode Id: '${barcode}' updated successful`,
        });
      }

      throw customException(
        `Package details for barcode Id '${barcode}' is not found`,
        HttpResponseType.NOT_FOUND,
      );
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function deletePackages(httpRequest) {
    try {
      const { userId } = httpRequest.pathParams;
      await packageList.deleteAllPackages(userId).catch((error) => {
        throw customException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: 'Packages removal successful',
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case HttpMethod.POST:
        return addPackages(httpRequest);
      case HttpMethod.PUT:
        if (httpRequest.pathParams && httpRequest.pathParams.userId) {
          return (httpRequest.queryParams && httpRequest.queryParams.barcode) ?
            updatePackageStatus(httpRequest) : defaultRouteHandler();
        }
        return defaultRouteHandler()
      case HttpMethod.DELETE:
        if (httpRequest.pathParams && httpRequest.pathParams.userId) {
          return deletePackages(httpRequest);
        }
        return defaultRouteHandler();
      case HttpMethod.GET:
        if (httpRequest.pathParams && httpRequest.pathParams.userId) {
          return (httpRequest.queryParams && httpRequest.queryParams.barcode)
            ? getPackage(httpRequest) : getAllPackages(httpRequest);
        }
        return defaultRouteHandler();
      default:
        return objectHandler({
          code: HttpResponseType.METHOD_NOT_ALLOWED,
          message: `${httpRequest.method} method not allowed`,
        });
    }
  };
}
