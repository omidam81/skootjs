const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Promotion = mongoose.model(
  'Promotion',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      code: {
        type: String,
        required: true,
        index: {
          unique: true
        }
      },
      amount: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      usedCount: {
        type: Number,
        required: false
      },
      maximumUse: {
        type: Number,
        required: false
      },
      days: {
        type: Number,
        required: false
      },
      last_used: {
        type: Date
      },
      created: {
        type: Date,
        default: Date.now
      },
      updated: {
        type: Date,
        default: Date.now
      },
      userId: { type: ObjectIdSchema, ref: 'Company' }
    },
    { collection: 'Promotion' }
  )
);
module.exports = Promotion;
