var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var TypeOfEmploymentSchema = new Schema({
    _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
    },
    title: {
        type: String,
        required: true
    }
}, { collection: 'TypeOfEmployment' });


var TypeOfEmployment = mongoose.model("TypeOfEmployment", TypeOfEmploymentSchema);

module.exports = TypeOfEmployment;