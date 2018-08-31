const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const _ = require('underscore');
const Business = require('../models/business');
const url = 'mongodb://localhost:27017/scoot3';
const option = {
  connectTimeoutMS: 60000,
  keepAlive: true,
  reconnectTries: 30000
};
var needtoChanges = [
  { c: 'Complain', f: 'businessId' },
  { c: 'Job', f: 'businessId' }
];

MongoClient.connect(
  url,
  option,
  async function(err, db) {
    console.log('Connected correctly to server');

    db.collection('Business')
      .find({ _id: /^b.*/i, isDeleted: { $exists: false } })
      .forEach(async doc => {
        let business = new Business(_.omit(doc, '_id'));
        business._id = new ObjectId();
        console.log(`Document Id [${doc._id}] is converted to ${business._id}`);
        doc.isDeleted = true;
        doc.newId = business._id;
        //Update current document
        await db
          .collection('Business')
          .update({ _id: doc._id }, doc, { upsert: true });
        //Insert new document with objectId
        await db.collection('Business').insertOne(business);

        await db
          .collection('Complain')
          .updateMany(
            { businessId: doc._id },
            { $set: { businessId: business._id } },
            { multi: true }
          );
        await db
          .collection('Job')
          .updateMany(
            { businessId: doc._id },
            { $set: { businessId: business._id } },
            { multi: true }
          );
      });
  }
);

// db.Business.remove({ isDouplicated: true });

// db.Business.find({ _id: /^b.*/i }).forEach(function(x) {
//   var xc = x._id;
//   print(xc);
//   var newDocument = x;
//   delete newDocument._id;
//   newDocument.isDouplicated = true;
//   newDocument.old_id = xc;
//   db.Business.insert(newDocument);
//   var newId = db.Business.findOne({ old_id: xc })._id;
//   for (var item in needtoChanges) {
//     db.getCollection(needtoChanges[item].c).updateMany(
//       { businessId: xc },
//       { $set: { businessId: newId } }
//     );
//   }
// });

// db.Business.updateMany({ _id: /^b.*/i }, { $set: { status: 'deleted_0' } });
