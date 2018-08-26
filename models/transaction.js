const mongoose = require('mongoose');
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Transaction = mongoose.model(
  'Transaction',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      paidAt: {
        type: Date
      },
      amount: {
        type: Number,
        required: true
      },
      paidAmount: {
        type: Number,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      promotionCode: {
        type: String
      },
      status: {
        type: String
      },
      transactionType: {
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
      companyId: { type: ObjectIdSchema, ref: 'Company' },
      packageId: { type: ObjectIdSchema, ref: 'Package' },
      promotionId: { type: ObjectIdSchema, ref: 'Promotion' }
    },
    { collection: 'Transaction' }
  )
);
module.exports = Transaction;
