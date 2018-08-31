const mongoose = require('mongoose');
const ObjectIdSchema = mongoose.Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const Candidate = mongoose.model(
  'Candidate',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      profileImg: {
        type: String
      },
      cvFile: {
        type: String
      },
      name: {
        type: String
      },
      surname: {
        type: String
      },
      email: {
        type: String,
        required: true
      },
      dateOfBirth: {
        type: Date
      },
      gender: {
        type: String
      },
      phone: {
        type: String
      },
      about: {
        type: String
      },
      nationality: {
        type: String
      },
      address: {
        type: String
      },
      location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
      },
      education: {
        type: [Object]
      },
      experience: {
        type: [Object]
      },
      rightToWorkInMalaysia: {
        type: Boolean
      },
      videoIntro: {
        type: String
      },
      status: {
        type: String,
        default: 'live'
      },
      huntStatus: {
        type: String
      },
      receiveMatchUpdates: {
        type: String,
        default: 'daily'
      },
      salaryPeriod: {
        type: String
      },
      salaryFrom: {
        type: Number
      },
      salaryTo: {
        type: Number
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
      skills: [{ type: ObjectIdSchema, ref: 'Skill' }],
      categories: [{ type: ObjectIdSchema, ref: 'Category' }],
      professions: [{ type: ObjectIdSchema, ref: 'Profession' }],
      certificates: [{ type: ObjectIdSchema, ref: 'Certificate' }],
      otherSkills: [{ type: ObjectIdSchema, ref: 'OtherSkill' }],
      otherCertificates: [{ type: ObjectIdSchema, ref: 'OtherCertificate' }],
      languages: [{ type: ObjectIdSchema, ref: 'Language' }],
      interviews: [{ type: ObjectIdSchema, ref: 'Interview' }],
      applications: [{ type: ObjectIdSchema, ref: 'JobApplication' }],
      matches: [{ type: ObjectIdSchema, ref: 'Match' }],
      shorList: [{ type: ObjectIdSchema, ref: 'Job' }],
      messages: [{ type: ObjectIdSchema, ref: 'Message' }],
      comments: [{ type: ObjectIdSchema, ref: 'Comment' }],
      typeOfEmployment: [{ type: ObjectIdSchema, ref: 'TypeOfEmployment' }],
      typeOfEducationId: { type: ObjectIdSchema, ref: 'TypeOfEducation' }
    },
    { collection: 'Candidate' }
  )
);
module.exports = Candidate;
