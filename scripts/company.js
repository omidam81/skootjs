const { MongoClient } = require('mongodb');
const _ = require('underscore');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Company = require('../models/company');
const url = 'mongodb://localhost:27017/scoot3';
const option = {
  connectTimeoutMS: 60000,
  keepAlive: true,
  reconnectTries: 30000
};
var needtoChanges = [
  { c: 'Business', f: 'companyId' },
  { c: 'CompanyPackage', f: 'companyId' },
  { c: 'InteractionLog', f: 'companyId' },
  { c: 'Job', f: 'companyId' },
  { c: 'Message', f: 'companyId' },
  { c: 'Interview', f: 'companyId' }
];
MongoClient.connect(
  url,
  option,
  async function(err, db) {
    console.log('Connected correctly to server');

    db.collection('Company')
      .find({ _id: /.*comp$/i, isDeleted: { $exists: false } })
      .forEach(async doc => {
        let company = new Company(_.omit(doc, '_id'));
        company._id = new ObjectId();
        console.log(`Document Id [${doc._id}] is converted to ${company._id}`);
        doc.isDeleted = true;
        doc.newId = company._id;
        //Update current document
        await db
          .collection('Company')
          .update({ _id: doc._id }, doc, { upsert: true });
        //Insert new document with objectId
        await db.collection('Company').insertOne(company);

        await db
          .collection('Business')
          .updateMany(
            { companyId: doc._id },
            { $set: { companyId: company._id } },
            { multi: true }
          );
        await db
          .collection('CompanyPackage')
          .updateMany(
            { companyId: doc._id },
            { $set: { companyId: company._id } },
            { multi: true }
          );
        await db
          .collection('InteractionLog')
          .updateMany(
            { companyId: doc._id },
            { $set: { companyId: company._id } },
            { multi: true }
          );
        await db
          .collection('Job')
          .updateMany(
            { companyId: doc._id },
            { $set: { companyId: company._id } },
            { multi: true }
          );
        await db
          .collection('Message')
          .updateMany(
            { companyId: doc._id },
            { $set: { companyId: company._id } },
            { multi: true }
          );
        await db
          .collection('Interview')
          .updateMany(
            { companyId: doc._id },
            { $set: { companyId: company._id } },
            { multi: true }
          );
      });
  }
);
