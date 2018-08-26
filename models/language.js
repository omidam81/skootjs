const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const LanguageSchema = new Schema(
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
  { collection: 'Language' }
);

const Language = mongoose.model('Language', LanguageSchema);
module.exports = Language;
