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

  function updatePackageStatusById(userId, _id, scanStatus) {
    return Package.findOneAndUpdate({ userId, _id }, { scanStatus });
  }

  function updatePackageStatusByBarcode(userId, barcode, scanStatus) {
    return Package.findOneAndUpdate({ userId, barcode }, { scanStatus });
  }

  function deleteAllPackages(userId) {
    return Package.remove({ userId });
  }

  return Object.freeze({
    insertPackages,
    findPackageByBarcode,
    findAllPackages,
    updatePackageStatusById,
    updatePackageStatusByBarcode,
    deleteAllPackages,
  });
}
