var express = require('express');        // call express
var User = require('../../models/user');
var router = express.Router();

router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

module.exports = router;