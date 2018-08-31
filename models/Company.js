const mongoose = require('mongoose');

const ObjectIdSchema = mongoose.Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

var CompanySchema = new mongoose.Schema(
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
    messages: [{ type: ObjectIdSchema, ref: 'Message' }],
    businesses: [{ type: ObjectIdSchema, ref: 'Business' }],
    comments: [{ type: ObjectIdSchema, ref: 'Comment' }]
  },
  { collection: 'Company' }
);
const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
