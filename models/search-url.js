const mongoose = require('mongoose');
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const SearchURL = mongoose.model(
  'SearchURL',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
      },
      term: {
        type: String
      },
      url: {
        type: String
      },
      keywords: {
        type: String
      },
      address: {
        type: String
      },
      categoryId: { type: ObjectIdSchema, ref: 'Category' }
    },
    { collection: 'SearchURL' }
  )
);
module.exports = SearchURL;
