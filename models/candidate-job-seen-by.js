const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CandidateJobSeenBy = mongoose.model(
  'CandidateJobSeenBy',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      jobId: { type: ObjectIdSchema, ref: 'Job' },
      candidateId: { type: ObjectIdSchema, ref: 'Candidate' }
    },
    { collection: 'CandidateJobSeenBy' }
  )
);
module.exports = CandidateJobSeenBy;
