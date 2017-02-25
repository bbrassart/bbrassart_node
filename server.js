// BASE SETUP
// =============================================================================

// Load env variables thanks to Dotenv
var dotenv = require('dotenv');
dotenv.load();

// call the packages we need
var express    = require('express');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var years      = require('./app/routes/models/years');
var blogposts       = require('./app/routes/models/blogs');
var home       = require('./app/routes/home');

// Set the view engine to html
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

// Connect with DB
mongoose.connect(
    'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE
);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// Serve static files
app.use('/app', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

// REGISTER ROUTES
// =============================================================================

app.use('/', home);
app.use('/api/v1', years);
app.use('/api/v1', blogposts);

// START SERVER
// =============================================================================

// Set port
var port = process.env.PORT || 6060;

app.listen(port);