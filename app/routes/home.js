var express = require('express');        // call express
var router = express.Router();
var Blogs = require('../models/blog');
var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;


router.get('/', function(req, res) {
    res.render('index.html', {});
});

router.get('/blog/:url', function(req, res) {
    Promise.all([
        Blogs.findOne({url: req.params.url}).exec(), Blogs.find().exec()
    ]).then(function(data) {
        res.render('show.html', {
            blog: data[0],
            posts: data[1]
        });
    });
});

module.exports = router;