const mongoose = require('mongoose');
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const SiteSEO = mongoose.model(
  'SiteSEO',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },

      page: {
        type: String
      },
      title: {
        type: String
      },
      description: {
        type: String
      },
      urlformat: {
        type: String
      },
      image: {
        type: String
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
    { collection: 'SiteSEO' }
  )
);
module.exports = SiteSEO;
