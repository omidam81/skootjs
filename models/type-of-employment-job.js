var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var TypeOfEmploymentJobSchema = new Schema({
    _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
    },
    typeOfEmploymentId: { type: ObjectIdSchema, ref: 'typeOfEmployment' },
    jobId: { type: ObjectIdSchema, ref: 'Job' },

}, { collection: 'TypeOfEmploymentJob' });


var TypeOfEmploymentJob = mongoose.model("TypeOfEmploymentJob", TypeOfEmploymentJobSchema);

module.exports = TypeOfEmploymentJob;