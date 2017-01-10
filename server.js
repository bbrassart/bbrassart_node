
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var bears      = require('./app/routes/models/bears');
var users      = require('./app/routes/models/users');
var test       = require('./app/routes/test');
var auth       = require('./app/routes/auth');
var authMiddleware = require('./app/routes/auth_middleware');

mongoose.connect('mongodb://localhost/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var port = process.env.PORT || 6060;        // set our port

// REGISTER OUR ROUTES
// =============================================================================

app.use('/', test);
app.use('/api', auth);
app.use('/api', authMiddleware, bears);
app.use('/api', bears);
app.use('/api', authMiddleware, users);

// START THE SERVER
// =============================================================================
app.listen(port);