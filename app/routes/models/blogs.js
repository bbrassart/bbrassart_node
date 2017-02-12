var express = require('express');        // call express
var Blogs = require('../../models/blog');
var router = express.Router();

router.route('/blogs')
    .get(function(req, res) {
        Blogs.find({}, function(err, blogs) {
            if (err)
                res.send(err);
            res.json(blogs);
        });
    });

router.route('/blogs/:index')

    .get(function(req, res) {
        Blogs.findOne({currentIndex: req.params.index}, function(err, blog) {
            if (err)
                res.send(err);
            res.json(blog);
        });
    });



module.exports = router;