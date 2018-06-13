var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var JobSchema = new Schema({
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
        // It's important to define type within type field, because
        // mongoose use "type" to identify field's object type.
        type: { type: String, default: 'Point' },
        // Default value is needed. Mongoose pass an empty array to
        // array type by default, but it will fail MongoDB's pre-save
        // validation.
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
        default: ""
    },
    notNew: {
        type: Boolean,
        default: false
    },
    lastUpdatedBy: {
        type: String
    }, 
    businessId: { type: ObjectIdSchema, ref: 'Business' }



}, { collection: 'Job' });


var Job = mongoose.model("Job", JobSchema);

module.exports = Job;