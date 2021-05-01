import { Schema, model } from 'mongoose';

const PackageSchema = Schema;

const packageSchema = new PackageSchema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  isScanned: {
    type: Boolean,
    default: false,
  },
  lastScan: {
    type: String,
    default: '',
  },
  seqNo: {
    type: String,
    default: '',
  },
  nameAndAddress: {
    type: String,
    default: '',
  },
}, { versionKey: false });

const Package = model('Package', packageSchema, 'packages');

export default Package;
