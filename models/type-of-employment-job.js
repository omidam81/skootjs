var mongoose = require('mongoose');

var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var TypeOfEmploymentJob = mongoose.model(
  'TypeOfEmploymentJob',
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
      jobs: [{ type: ObjectIdSchema, ref: 'Job' }]
    },
    { collection: 'TypeOfEmploymentJob' }
  )
);

module.exports = TypeOfEmploymentJob;
