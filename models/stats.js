const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Stats = mongoose.model(
  'Stats',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      name: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      },
      updated: {
        type: Date,
        default: Date.now
      }
    },
    { collection: 'Stats' }
  )
);
module.exports = Stats;
