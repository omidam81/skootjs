const mongoose = require('mongoose');

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CandidateOtherSkills = mongoose.model(
  'CandidateOtherSkills',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      skillId: { type: ObjectIdSchema, ref: 'Skill' },
      candidateId: { type: ObjectIdSchema, ref: 'Candidate' }
    },
    { collection: 'CandidateOtherSkills' }
  )
);
module.exports = CandidateOtherSkills;
