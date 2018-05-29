var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var Company = require('../models/company');
var BusinessSchema = new Schema({
    _id: {
        type: ObjectIdSchema,
        default: new ObjectId()
    },
    name: {
        type: String,
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    companyId:{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
}, { collection: 'Business' });


var Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;