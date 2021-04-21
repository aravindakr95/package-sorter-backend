import Package from '../models/main/package';

export default function makePackageList() {
  function insertPackages(data) {
    return Package.insertMany(data);
  }

  function findPackageByBarcode(barcode) {
    return Package.findOne(barcode);
  }

  function findAllPackages() {
    return Package.find();
  }

  function deleteAllPackages() {
    return Package.remove();
  }

  return Object.freeze({
    insertPackages,
    findPackageByBarcode,
    findAllPackages,
    deleteAllPackages
  });
}
