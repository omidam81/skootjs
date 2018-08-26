const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CandidateJobShortlist = mongoose.model(
  'CandidateJobShortlist',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      jobId: { type: ObjectIdSchema, ref: 'Job' },
      candidateId: { type: ObjectIdSchema, ref: 'Candidate' }
    },
    { collection: 'CandidateJobShortlist' }
  )
);
module.exports = CandidateJobShortlist;
