var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

var Business = mongoose.model(
  'Business',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      profileImg: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      about: {
        type: String
      },
      street: {
        type: String
      },
      city: {
        type: String
      },
      country: {
        type: String
      },
      address: {
        type: String
      },
      location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
      },
      status: {
        type: String,
        required: true
      },
      lastUpdatedBy: {
        type: String
      },
      companyId: { type: ObjectIdSchema, ref: 'Company' },
      //jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
      jobId: { type: ObjectIdSchema, ref: 'Job' },
      categoryId: { type: ObjectIdSchema, ref: 'Category' },
      interviews: [{ type: ObjectIdSchema, ref: 'Interview' }],
      comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
    },
    { collection: 'Business' }
  )
);
module.exports = Business;
