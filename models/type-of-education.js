const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const TypeOfEducation = mongoose.model(
  'TypeOfEducation',
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
      jobs: [{ type: ObjectIdSchema, ref: 'Job' }],
      candidates: [{ type: ObjectIdSchema, ref: 'Candidate' }]
    },
    { collection: 'TypeOfEducation' }
  )
);
module.exports = TypeOfEducation;
