import { Schema, model } from 'mongoose';

const PackageSchema = Schema;

const packageSchema = new PackageSchema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  barcode: {
    type: String,
    required: true,
  },
  lastScan: {
    type: String,
    default: 'N/A', // todo: not working
  },
  seqNo: {
    type: String,
    required: true,
  },
  nameAndAddress: {
    type: String,
    required: true,
  },
});

const Package = model('Package', packageSchema, 'packages');

export default Package;
