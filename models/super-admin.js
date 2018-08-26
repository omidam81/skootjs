const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
    },
    { collection: 'User' }
  )
);
module.exports = User;
