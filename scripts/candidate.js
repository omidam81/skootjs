const { MongoClient } = require('mongodb');
const _ = require('underscore');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Candidate = require('../models/condidate');
const url = 'mongodb://localhost:27017/scoot3';
const option = {
  connectTimeoutMS: 60000,
  keepAlive: true,
  reconnectTries: 30000
};
var needtoChanges = [
  { c: 'CandidateJobSeenBy', f: 'candidateId' },
  { c: 'CandidateJobShortlist', f: 'candidateId' },
  { c: 'CandidateLanguage', f: 'candidateId' },
  { c: 'CandidateProfession', f: 'candidateId' },
  { c: 'CandidateSkill', f: 'candidateId' },
  { c: 'Complain', f: 'candidateId' },
  { c: 'InteractionLog', f: 'candidateId' },
  { c: 'Match', f: 'candidateId' },
  { c: 'jobApplicatinnew', f: 'candidateId' },
  { c: 'RelatedJob', f: 'candidateId' },
  { c: 'CandidateTypeOfEmployment', f: 'candidateId' }
];
//{ _id: /.*comp/i, status: { $ne: 'deleted_0' } }
MongoClient.connect(
  url,
  option,
  async function(err, db) {
    console.log('Connected correctly to server');

    db.collection('Candidate')
      .find({ _id: /.*cand$/i, isDeleted: { $exists: false } })
      //.limit(5)
      .forEach(async doc => {
        let candidate = new Candidate(_.omit(doc, '_id'));
        candidate._id = new ObjectId();
        console.log(
          `Document Id [${doc._id}] is converted to ${candidate._id}`
        );
        doc.isDeleted = true;
        doc.newId = candidate._id;
        //Update current document
        await db
          .collection('Candidate')
          .update({ _id: doc._id }, doc, { upsert: true });
        //Insert new document with objectId
        await db.collection('Candidate').insertOne(candidate);

        await db
          .collection('CandidateJobSeenBy')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('CandidateJobShortlist')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('CandidateLanguage')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('CandidateProfession')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('CandidateSkill')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('Complain')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('InteractionLog')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        // await db
        //   .collection('Match')
        //   .updateMany(
        //     { candidateId: doc._id },
        //     { $set: { candidateId: candidate._id } },
        //     { multi: true }
        //   );
        await db
          .collection('jobApplicatinnew')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('RelatedJob')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
        await db
          .collection('CandidateTypeOfEmployment')
          .updateMany(
            { candidateId: doc._id },
            { $set: { candidateId: candidate._id } },
            { multi: true }
          );
      });
  }
);
