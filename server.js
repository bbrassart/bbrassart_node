
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var years      = require('./app/routes/models/years');
var blogposts       = require('./app/routes/models/blogs');
var home       = require('./app/routes/home');

mongoose.connect('mongodb://localhost/bbrassart_development');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/app', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

var port = process.env.PORT || 6060;        // set our port

// REGISTER OUR ROUTES
// =============================================================================

app.use('/', home);
app.use('/api/v1', years);
app.use('/api/v1', blogposts);

// START THE SERVER
// =============================================================================
app.listen(port);