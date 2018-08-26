const mongoose = require('mongoose');

const Admin = mongoose.model(
  'Admin',
  new mongoos.Schema(
    {
      username: {
        type: String,
        required: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        lowercase: true
      },
      created: {
        type: Date,
        default: Date.now
      },
      updated: {
        type: Date,
        default: Date.now
      },

      comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
    },
    { collection: 'Admin' }
  )
);
module.exports = Admin;
