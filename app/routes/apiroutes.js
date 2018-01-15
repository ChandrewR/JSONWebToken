var express = require('express');
var expapp = express();
var apiRoutes = express.Router(); 
var User   = require('../models/user');
// TODO: route to authenticate a user (POST http://localhost:5000/api/authenticate)

// TODO: route middleware to verify a token

// route to show a random message (GET http://localhost:5000/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'api request!' });
});

// route to return all users (GET http://localhost:5000/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});  

// Add a user
apiRoutes.get('/addUser', function(req, res) {

  // create a sample user
  var user = new User({ 
    name: 'Test', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true,name : user.name });
  });
}); 

// apply the routes to our application with the prefix /api
expapp.use('/api', apiRoutes);
module.exports = apiRoutes;