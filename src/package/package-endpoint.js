import HttpResponseType from '../enums/http/http-response-type';

import customException from '../helpers/utilities/custom-exception';
import { objectHandler } from '../helpers/utilities/normalize-request';

export default function makePackageEndPointHandler({ packageList }) {
  async function addPackages(httpRequest) {
    try {
      const packages = httpRequest.body;
      console.log(packages)
      await packageList.insertPackages(packages).catch((error) => {
        console.log(error)
        throw customException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: `Package details added successful`,
      });
    } catch (error) {
      const { code, message } = error;

      return objectHandler({ code, message });
    }
  }

  async function getPackage(httpRequest) {
    try {
      const { barcode } = httpRequest.queryParams;
      const packageDetails = await packageList.findPackageByBarcode({ barcode }).catch((error) => {
        throw customException(error.message);
      });

      console.log(packageDetails)

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

  async function getAllPackages() {
    try {
      const packageDetails = await packageList.findAllPackages().catch((error) => {
        throw customException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        data: packageDetails,
        message: `Packages detail retrieval successful`,
      });
    } catch (error) {
      const { code, message } = error;

      return objectHandler({ code, message });
    }
  }

  async function deletePackages() {
    try {
      await packageList.deleteAllPackages().catch((error) => {
        throw customException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: `Packages removal successful`,
      });
    } catch (error) {
      const { code, message } = error;

      return objectHandler({ code, message });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.path) {
      case '/upload':
        return addPackages(httpRequest);
      case '/delete':
        return deletePackages();
      case '/':
        return (httpRequest.queryParams && httpRequest.queryParams.barcode) ?
            getPackage(httpRequest) : getAllPackages();
      default:
        return objectHandler({
          code: HttpResponseType.METHOD_NOT_ALLOWED,
          message: `${httpRequest.method} method not allowed`,
        });
    }
  };
}
