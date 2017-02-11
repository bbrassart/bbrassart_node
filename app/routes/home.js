var express = require('express');        // call express
var router = express.Router();

router.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

module.exports = router;