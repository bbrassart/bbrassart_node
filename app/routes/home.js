var express = require('express');        // call express
var router = express.Router();
var Blogs = require('../models/blog');
var mailer = require('express-mailer');

router.get('/', function(req, res) {
    res.render('index.html', {flashMessage: req.flash('emailSent')});
});

router.get('/blog/:url', function(req, res) {
    Promise.all([
        Blogs.findOne({url: req.params.url}).exec(), Blogs.find().exec()
    ]).then(function(data) {
        res.render('show.html', {
            blog: data[0],
            posts: data[1],
            flashMessage: req.flash('emailSent')
        });
    });
});

router.post('/contact', function(req, res) {

    var backURL = req.header('Referer') || '/';

    res.mailer.send('outboundEmail', {
        to: process.env.GMAIL_USERNAME,
        subject: req.body.name + ' contacted you',
        message: req.body.message,
        visitorEmail: req.body.email,
        visitorName: req.body.name
    }, function (err) {
        if (err) {
            res.redirect(backURL);
        }
        req.flash('emailSent', 'Thanks for contacting me! I will get back to you in the coming days.');
        res.redirect(backURL);
    });
});

module.exports = router;