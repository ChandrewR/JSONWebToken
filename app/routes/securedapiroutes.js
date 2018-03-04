var express = require('express');
var expapp = express();
var apiRoutes = express.Router(); 
var User   = require('../models/user');
var SecuredUser   = require('../models/securedusers');
var bodyParser  = require('body-parser');
expapp.use(bodyParser.urlencoded({ extended: false }));
//expapp.use(bodyParser());
expapp.use(bodyParser.json());

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'secured api request!' });
});

apiRoutes.get('/securedusers', function(req, res) {
  SecuredUser.find({}, function(err, users) {
    res.json(users);
  });
});  

// apply the routes to our application with the prefix /api
expapp.use('/securedapi', apiRoutes);
module.exports = apiRoutes;