const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const InteractionLogSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    typeOfAction: {
      type: String
    },
    actionDate: {
      type: Date
    },

    responseDate: {
      type: Date
    },

    SMS: {
      type: Boolean
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
    interviewId: { type: ObjectIdSchema, ref: 'Interview' },
    comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
  },
  { collection: 'InteractionLog' }
);

const InteractionLog = mongoose.model('InteractionLog', InteractionLogSchema);
module.exports = InteractionLog;
