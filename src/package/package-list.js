import Package from '../models/main/package';

export default function makePackageList() {
  function insertPackages(data) {
    return Package.insertMany(data);
  }

  function findPackageByBarcode(userId, barcode) {
    return Package.findOne({ userId, barcode });
  }

  function findAllPackages(userId) {
    return Package.find({ userId });
  }

  function updatePackageStatus(userId, barcode, scanStatus) {
    return Package.findOneAndUpdate({ userId, barcode }, { scanStatus });
  }

  function deleteAllPackages(userId) {
    return Package.remove({ userId });
  }

  return Object.freeze({
    insertPackages,
    findPackageByBarcode,
    findAllPackages,
    updatePackageStatus,
    deleteAllPackages,
  });
}
