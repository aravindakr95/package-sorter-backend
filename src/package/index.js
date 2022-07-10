import makePackageList from './package-list';
import makeAuthList from '../auth/auth-list';
import makePackageEndPointHandler from './package-endpoint';

const packageList = makePackageList();
const userList = makeAuthList();

const packageEndpointHandler = makePackageEndPointHandler({ packageList, userList });

export default packageEndpointHandler;
