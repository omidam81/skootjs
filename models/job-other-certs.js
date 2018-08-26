const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const JobOtherCertsSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
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
    jobId: { type: ObjectIdSchema, ref: 'Job' }
  },
  { collection: 'JobOtherCerts' }
);

const JobOtherCerts = mongoose.model('JobOtherCerts', JobOtherCertsSchema);
module.exports = JobOtherCerts;
