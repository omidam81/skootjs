var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var CompanySchema = new Schema({
    _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
    },
    companyName: {
        type: String,
    }
}, { collection: 'Company' });


var Company = mongoose.model("Company", CompanySchema);
module.exports = Company;