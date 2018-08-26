const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CompanyPackageSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    status: {
      type: String
    },
    dateApplied: {
      type: Date
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    companyId: { type: ObjectIdSchema, ref: 'Company' },
    packageId: { type: ObjectIdSchema, ref: 'Package' },
    promotionId: { type: ObjectIdSchema, ref: 'Promotion' },
    transactionId: { type: ObjectIdSchema, ref: 'Transaction' },
    jobId: { type: ObjectIdSchema, ref: 'Job' }
  },
  { collection: 'CompanyPackage' }
);

const CompanyPackage = mongoose.model('CompanyPackage', CompanyPackageSchema);
module.exports = CompanyPackage;
