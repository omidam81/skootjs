var mongoose = require('mongoose');

var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var UserLanguage = mongoose.model(
  'UserLanguage',
  new mongoose.Schema(
    {
      _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
      },
      candidateId: { type: ObjectIdSchema, ref: 'Candidate' },
      languageId: { type: ObjectIdSchema, ref: 'Language' }
    },
    { collection: 'UserLanguage' }
  )
);

module.exports = UserLanguage;
