import { Schema, model } from 'mongoose';

const PackageSchema = Schema;

const timestamp = Date.now();

const packageSchema = new PackageSchema({
  timestamp: {
    type: Number,
    default: timestamp,
  },
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    default: '',
  },
  routeDate: {
    type: String,
    default: new Date(timestamp).toLocaleDateString(),
  },
  scanStatus: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Complete'],
  },
  driver: {
    type: String,
    default: '',
  },
  stopNumber: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
}, { versionKey: false });

const Package = model('Package', packageSchema, 'packages');

export default Package;
