const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CategorySchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    name: {
      type: String,
      required: true
    },
    businesses: [{ type: ObjectIdSchema, ref: 'Business' }],
    jobs: [{ type: ObjectIdSchema, ref: 'Job' }],
    candidates: [{ type: ObjectIdSchema, ref: 'Candidate' }],
    professions: [{ type: ObjectIdSchema, ref: 'Profession' }]
  },
  { collection: 'Category' }
);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
