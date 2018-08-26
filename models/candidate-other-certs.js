const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CandidateOtherCerts = mongoose.model(
  'CandidateJobSeenBy',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      certificateId: { type: ObjectIdSchema, ref: 'Certificate' },
      candidateId: { type: ObjectIdSchema, ref: 'Candidate' }
    },
    { collection: 'CandidateJobSeenBy' }
  )
);
module.exports = CandidateOtherCerts;
