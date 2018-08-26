const mongoose = require('mongoose');
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Message = mongoose.model(
  'Message',
  new mongoos.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },

      text: {
        type: String,
        required: true
      },

      date: {
        type: Date,
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
      //TODO
      fromId: { type: ObjectIdSchema, ref: 'Job' },
      toId: { type: ObjectIdSchema, ref: 'Job' },

      jobId: { type: ObjectIdSchema, ref: 'Job' },
      candidateId: { type: ObjectIdSchema, ref: 'Candidate' },
      companyId: { type: ObjectIdSchema, ref: 'Company' },
      jobApplicationId: { type: ObjectIdSchema, ref: 'JobApplication' }
    },
    { collection: 'Message' }
  )
);
module.exports = Message;
