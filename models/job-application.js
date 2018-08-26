const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const JobApplicationSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    date: {
      type: Date
    },
    message: {
      type: String
    },
    shortListed: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      required: true
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
    jobId: { type: ObjectIdSchema, ref: 'Job' },
    comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
  },
  { collection: 'JobApplication' }
);

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);
module.exports = JobApplication;
