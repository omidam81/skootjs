const { MongoClient } = require('mongodb');
const _ = require('underscore');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Job = require('../models/job');
const url = 'mongodb://localhost:27017/scoot3';
const option = {
  connectTimeoutMS: 60000,
  keepAlive: true,
  reconnectTries: 30000
};
//require('./baseRun')();
var needtoChanges = [
  { c: 'CandidateJobSeenBy', f: 'jobId' },
  { c: 'CandidateJobShortlist', f: 'jobId' },
  { c: 'CompanyPackage', f: 'jobId' },
  { c: 'Complain', f: 'jobId' },
  { c: 'InteractionLog', f: 'jobId' },
  { c: 'Interview', f: 'jobId' },
  { c: 'JobApplication', f: 'jobId' },
  { c: 'JobLanguage', f: 'jobId' },
  { c: 'JobSkill', f: 'jobId' },
  { c: 'Match', f: 'jobId' },
  { c: 'Message', f: 'jobId' },
  { c: 'RelatedJob', f: 'jobId' },
  { c: 'TypeOfEmploymentJob', f: 'jobId' },
  { c: 'jobApplicatinnew', f: 'jobId' }
];

MongoClient.connect(
  url,
  option,
  async function(err, db) {
    console.log('Connected correctly to server');

    db.collection('Job')
      .find({ _id: /.*job$/i, isDeleted: { $exists: false } })
      //.limit(5)
      .forEach(async doc => {
        let job = new Job(_.omit(doc, '_id'));
        job._id = new ObjectId();
        console.log(`Document Id [${doc._id}] is converted to ${job._id}`);
        doc.isDeleted = true;
        doc.newId = job._id;
        //Update current document
        await db
          .collection('Job')
          .update({ _id: doc._id }, doc, { upsert: true });
        //Insert new document with objectId
        await db.collection('Job').insertOne(job);
        await db
          .collection('CandidateJobSeenBy')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('CandidateJobShortlist')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('CompanyPackage')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('Complain')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('InteractionLog')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('Interview')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );

        await db
          .collection('JobApplication')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('JobLanguage')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('JobSkill')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        // await db
        //   .collection('Match')
        //   .updateMany(
        //     { jobId: doc._id },
        //     { $set: { jobId: job._id } },
        //     { multi: true }
        //   );
        await db
          .collection('Message')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('RelatedJob')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('TypeOfEmploymentJob')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
        await db
          .collection('jobApplicatinnew')
          .updateMany(
            { jobId: doc._id },
            { $set: { jobId: job._id } },
            { multi: true }
          );
      });
  }
);
