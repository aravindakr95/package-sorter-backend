import HttpResponseType from '../enums/http/http-response-type';

import customException from '../helpers/utilities/custom-exception';
import {objectHandler} from '../helpers/utilities/normalize-request';
import defaultRouteHandler from '../helpers/http/default-route-handler';

import HttpMethod from '../enums/http/http-method';

export default function makePackageEndPointHandler({packageList, userList}) {
    async function isActivatedUser(userId) {
        const isValid = await userList.findUserById({userId});
        return Boolean(isValid);
    }

    async function addPackages(httpRequest) {
        try {
            const packages = httpRequest.body;
            const isValid = await isActivatedUser(packages.userId);

            if (isValid) {
                await packageList.insertPackages(packages).catch((error) => {
                    throw customException(error.message);
                });

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    message: 'Package details added successful',
                });
            }

            throw customException(
                'User is deactivated, contact admin for more details',
                HttpResponseType.FORBIDDEN,
            );
        } catch (error) {
            const {code, message} = error;
            return objectHandler({code, message});
        }
    }

    async function getPackage(httpRequest) {
        try {
            const {orderId} = httpRequest.queryParams;
            const {userId} = httpRequest.pathParams;

            const isValid = await isActivatedUser(userId);

            if (userId && isValid) {
                const packageDetails = await packageList
                    .findPackageByBarcode(userId, orderId).catch((error) => {
                        throw customException(error.message);
                    });

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: packageDetails,
                    message: `Package ${orderId} details retrieval successful`,
                });
            }

            throw customException(
                'User is deactivated or not found, contact admin for more details',
                HttpResponseType.FORBIDDEN,
            );
        } catch (error) {
            const {code, message} = error;
            return objectHandler({code, message});
        }
    }

    async function getAllPackages(httpRequest) {
        try {
            const {userId} = httpRequest.pathParams;
            const isValid = await isActivatedUser(userId);

            if (isValid) {
                const packageDetails = await packageList.findAllPackages(userId).catch((error) => {
                    throw customException(error.message);
                });

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: packageDetails,
                    message: 'Packages detail retrieval successful',
                });
            }

            throw customException(
                'User is deactivated, contact admin for more details',
                HttpResponseType.FORBIDDEN,
            );
        } catch (error) {
            const {code, message} = error;
            return objectHandler({code, message});
        }
    }

    async function updatePackageStatusById(httpRequest) {
        try {
            const {userId} = httpRequest.pathParams;
            const {packageId} = httpRequest.queryParams;
            const {scanStatus} = httpRequest.body;

            const isValid = await isActivatedUser(userId);

            if (isValid) {
                const result = await packageList
                    .updatePackageStatusById(userId, packageId, scanStatus).catch((error) => {
                        throw customException(error.message);
                    });

                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        message: `Packages status for package Id: '${packageId}' updated successful`,
                    });
                }

                throw customException(
                    `Package details for package Id '${packageId}' is not found`,
                    HttpResponseType.NOT_FOUND,
                );
            }

            throw customException(
                'User is deactivated, contact admin for more details',
                HttpResponseType.FORBIDDEN,
            );
        } catch (error) {
            const {code, message} = error;
            return objectHandler({code, message});
        }
    }

    async function updatePackageStatusByBarcode(httpRequest) {
        try {
            const {userId} = httpRequest.pathParams;
            const {orderId} = httpRequest.queryParams;
            const {scanStatus} = httpRequest.body;

            const isValid = await isActivatedUser(userId);

            if (isValid) {
                const result = await packageList
                    .updatePackageStatusByBarcode(userId, orderId, scanStatus).catch((error) => {
                        throw customException(error.message);
                    });

                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        message: `Packages status for barcode Id: '${orderId}' updated successful`,
                    });
                }

                throw customException(
                    `Package details for barcode Id '${orderId}' is not found`,
                    HttpResponseType.NOT_FOUND,
                );
            }

            throw customException(
                'User is deactivated, contact admin for more details',
                HttpResponseType.FORBIDDEN,
            );
        } catch (error) {
            const {code, message} = error;
            return objectHandler({code, message});
        }
    }

    async function deletePackages(httpRequest) {
        try {
            const {userId} = httpRequest.pathParams;
            const isValid = await isActivatedUser(userId);

            if (isValid) {
                await packageList.deleteAllPackages(userId).catch((error) => {
                    throw customException(error.message);
                });

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    message: 'Packages removal successful',
                });
            }

            throw customException(
                'User is deactivated, contact admin for more details',
                HttpResponseType.FORBIDDEN,
            );
        } catch (error) {
            const {code, message} = error;
            return objectHandler({code, message});
        }
    }

    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case HttpMethod.POST:
                return addPackages(httpRequest);
            case HttpMethod.PUT:
                if (httpRequest.pathParams && httpRequest.pathParams.userId) {
                    if (httpRequest.queryParams && httpRequest.queryParams.packageId) {
                        return updatePackageStatusById(httpRequest);
                    }

                    if (httpRequest.queryParams && httpRequest.queryParams.orderId) {
                        return updatePackageStatusByBarcode(httpRequest);
                    }

                    return defaultRouteHandler();
                }
                return defaultRouteHandler();
            case HttpMethod.DELETE:
                if (httpRequest.pathParams && httpRequest.pathParams.userId) {
                    return deletePackages(httpRequest);
                }
                return defaultRouteHandler();
            case HttpMethod.GET:
                if (httpRequest.pathParams && httpRequest.pathParams.userId) {
                    if (httpRequest.queryParams && httpRequest.queryParams.orderId) {
                        return getPackage(httpRequest);
                    }

                    return getAllPackages(httpRequest);
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

