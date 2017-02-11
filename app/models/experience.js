// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Experience', new Schema({
    official_url: String,
    starting_date: Date,
    title: String,
    tags: Array,
    company_name: String,
    location: String,
    description: String,
    years: [YearSchema]
}));