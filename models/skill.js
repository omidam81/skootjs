const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Skill = mongoose.model(
  'Skill',
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
      candidates: [{ type: ObjectIdSchema, ref: 'Candidate' }],
      professions: [{ type: ObjectIdSchema, ref: 'Profession' }]
    },
    { collection: 'Skill' }
  )
);
module.exports = Skill;
