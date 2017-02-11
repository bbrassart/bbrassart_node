var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var YearSchema   = new Schema({
    title: Number
});

module.exports = mongoose.model('Year', YearSchema);