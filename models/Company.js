const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CompanySchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    contactName: {
      type: String
    },
    companyName: {
      type: String
    },

    contactPhone: {
      type: String
    },

    contactEmail: {
      type: String
    },
    status: {
      type: String
    },
    lastUpdatedBy: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    messages: [{ type: ObjectIdSchema, ref: 'Messages' }],
    businesses: [{ type: ObjectIdSchema, ref: 'Business' }],
    comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
  },
  { collection: 'Company' }
);

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
