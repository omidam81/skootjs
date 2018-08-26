const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CertificateSchema = new Schema(
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
  { collection: 'Certificate' }
);

const Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;
