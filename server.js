var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens


var authapi   = require('./app/routes/authenticateroutes'); // import authenticate module
var config = require('./config'); // get our config file
//var User   = require('./app/models/user'); // get our mongoose model
var routeapis   = require('./app/routes/apiroutes'); // import apiroute module


var port = process.env.PORT || 5000; 
console.log('Assigning the port: ' + port);
mongoose.connect(config.database,{useMongoClient: true}); // connect to database
//app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
console.log('Enabled morgan console in dev mode');

// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.use('/auth',authapi);
app.use('/auth/test',authapi);
app.use('/auth/authenticate',authapi);


// API ROUTES -------------------
/*// Add a user
app.get('/addUser', function(req, res) {

  // create a sample user
  var user = new User({ 
    name: 'Chandru', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true,name : user.name });
  });
});*/

// route middleware to verify a token
/*app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'Secret-Default', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        failure: false, 
        message: 'No token provided.' 
    });

  }
});*/

app.use('/api',routeapis);
app.use('/api/users',routeapis);
app.use('/api/addUser',routeapis);

// API ROUTES -------------------

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Listening to http://localhost:' + port);