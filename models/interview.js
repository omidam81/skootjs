const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const InterviewSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    message: {
      type: String
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    address: {
      type: string
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    status: {
      type: String,
      required: true
    },
    updateBy: {
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
    fromId: { type: ObjectIdSchema, ref: 'Business' },
    jobId: { type: ObjectIdSchema, ref: 'Job' },
    toId: { type: ObjectIdSchema, ref: 'Candidate' },
    comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
  },
  { collection: 'Interview' }
);

const Interview = mongoose.model('Interview', InterviewSchema);
module.exports = Interview;
