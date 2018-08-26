const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const JobOtherSkillsSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },

    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    skillId: { type: ObjectIdSchema, ref: 'Skill' },
    jobId: { type: ObjectIdSchema, ref: 'Job' }
  },
  { collection: 'JobOtherSkills' }
);

const JobOtherSkills = mongoose.model('JobOtherSkills', JobOtherSkillsSchema);
module.exports = JobOtherSkills;
