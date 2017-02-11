var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BlogpostSchema   = new Schema({
    url: String,
    title: String,
    currentIndex: Number,
    image_caption: String,
    image: String,
    intro: String,
    text: String,
    date: Date,
    author: String,
    author_logo: String,
    tags: Array
});

module.exports = mongoose.model('Blog', BlogpostSchema);