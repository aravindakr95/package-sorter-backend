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
    default: 'N/A', // todo: not working
  },
  nameAndAddress: {
    type: String,
    default: 'N/A', // todo: not working
  },
});

const Package = model('Package', packageSchema, 'packages');

export default Package;
