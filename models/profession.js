const mongoose = require('mongoose');
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Profession = mongoose.model(
  'Profession',
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
      skills: [{ type: ObjectIdSchema, ref: 'Skill' }],
      certificates: [{ type: ObjectIdSchema, ref: 'Certificate' }],
      jobs: [{ type: ObjectIdSchema, ref: 'Job' }],
      candidates: [{ type: ObjectIdSchema, ref: 'Candidate' }],
      categoryId: { type: ObjectIdSchema, ref: 'Category' }
    },
    { collection: 'Profession' }
  )
);
module.exports = Profession;
