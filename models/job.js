const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

var JobSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    otherInformation: {
      type: String
    },
    typeOfSalary: {
      type: String
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
    salaryRate: {
      type: String
    },
    salaryHidden: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    informalAddress: {
      type: String
    },

    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    benefits: {
      type: [String]
    },
    created: {
      type: Date,
      required: true
    },
    updated: {
      type: Date
    },
    expires: {
      type: Date
    },
    published: {
      type: Date
    },
    lastViewedAt: {
      type: Date
    },
    acceptsForeigners: {
      type: Boolean,
      default: true
    },
    keywords: {
      type: String,
      required: true,
      default: ''
    },
    notNew: {
      type: Boolean,
      default: false
    },
    lastUpdatedBy: {
      type: String
    },
    //belongsTo
    businessId: { type: ObjectIdSchema, ref: 'Business' },
    professionId: { type: ObjectIdSchema, ref: 'Profession' },
    typeOfEducationId: { type: ObjectIdSchema, ref: 'TypeOfEducation' },
    categoryId: { type: ObjectIdSchema, ref: 'Category' },
    packageName: { type: ObjectIdSchema, ref: 'Package' },
    companyId: { type: ObjectIdSchema, ref: 'Company' },

    //"hasMany"
    interviews: [{ type: ObjectIdSchema, ref: 'Interview' }],
    messages: [{ type: ObjectIdSchema, ref: 'Message' }],
    applications: [{ type: ObjectIdSchema, ref: 'Application' }],
    matches: [{ type: ObjectIdSchema, ref: 'Matche' }],
    comments: [{ type: ObjectIdSchema, ref: 'Comment' }],

    //"hasAndBelongsToMany"
    typeOfEmploymentJobs: [
      { type: ObjectIdSchema, ref: 'TypeOfEmploymentJob' }
    ],
    CandidateJobShortlist: [{ type: ObjectIdSchema, ref: 'Candidate' }],
    skills: [{ type: ObjectIdSchema, ref: 'Skill' }],
    certificates: [{ type: ObjectIdSchema, ref: 'Certificate' }],
    otherSkills: [{ type: ObjectIdSchema, ref: 'Skill' }],
    jobOtherCerts: [{ type: ObjectIdSchema, ref: 'Certificate' }],
    languages: [{ type: ObjectIdSchema, ref: 'Language' }],
    CandidateJobSeenBy: [{ type: ObjectIdSchema, ref: 'Candidate' }]
  },
  { collection: 'Job' }
);

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
