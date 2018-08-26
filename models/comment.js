const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const CommentSchema = new Schema(
  {
    _id: {
      type: ObjectIdSchema,
      default: new ObjectId()
    },
    note: {
      type: String
    },
    fieldName: {
      type: String
    },
    newContent: {
      type: String
    },
    newContent: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    },
    authorId: { type: ObjectIdSchema, ref: 'Author' },
    //TODO
    // "subject": {
    //   "type": "belongsTo",
    //   "polymorphic": {
    //     "foreignKey": "subjectId",
    //     "discriminator": "subjectType"
    //   }
    // }
    subjectId: { type: ObjectIdSchema, ref: 'Subject' }
  },
  { collection: 'Comment' }
);

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
