const mongoose = require('mongoose');
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Match = mongoose.model(
  'Condidate',
  new mongoos.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      date: {
        type: Date,
        required: true
      },
      invitedToApply: {
        type: Boolean,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      expires: {
        type: Date,
        required: true
      },
      emailSent: {
        type: Boolean,
        default: false
      },
      score: {
        type: Number,
        default: 0
      },
      created: {
        type: Date,
        default: Date.now
      },
      updated: {
        type: Date,
        default: Date.now
      },
      jobId: { type: ObjectIdSchema, ref: 'Job' },
      candidateId: { type: ObjectIdSchema, ref: 'Candidate' }
    },
    { collection: 'Match' }
  )
);
module.exports = Match;
