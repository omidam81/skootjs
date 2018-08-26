const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const ComplainSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    reason: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    candidateId: { type: ObjectIdSchema, ref: 'Candidate' },
    companyId: { type: ObjectIdSchema, ref: 'Company' },
    jobId: { type: ObjectIdSchema, ref: 'Job' },
    businessId: { type: ObjectIdSchema, ref: 'Business' },
    jobApplicationId: { type: ObjectIdSchema, ref: 'JobApplication' }
  },
  { collection: 'Complain' }
);

const Complain = mongoose.model('Complain', ComplainSchema);
module.exports = Complain;
