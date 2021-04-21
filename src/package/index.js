import makePackageList from './package-list';
import makePackageEndPointHandler from './package-endpoint';

const packageList = makePackageList();

const packageEndpointHandler = makePackageEndPointHandler({ packageList });

export default packageEndpointHandler;
