var express = require('express');        // call express
var Year = require('../../models/year');
var router = express.Router();

router.route('/years/:year_title')

    .get(function(req, res) {
        Year.find({title: req.params.year_title}, function(err, year) {
            if (err)
                res.send(err);
            res.json(year);
        });
    });

module.exports = router;