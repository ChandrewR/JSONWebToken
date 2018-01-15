var express = require('express');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('../models/user');
//var bodyParser  = require('body-parser');
var authapp = express();
var authenticateRoutes = express.Router(); 

authenticateRoutes.get('/test', function(req, res) {
  res.json({
        success: true,
        message: 'Authentication api is ready!'
        });
});

authenticateRoutes.get('/', function(req, res) {
  res.json({ message: 'Authenticate api request!' });
});


authenticateRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

    const payload = {
      admin: user.admin 
    };
    
    var token = jwt.sign(payload, 'Secret-Default',{ expiresIn: '1h'});
    //var older_token = jwt.sign({ payload, iat: Math.floor(Date.now() / 1000) - 30 }, 'Secret-Default');

    res.json({
        success: true,
        message: 'JSON Web Token!',
        token: token
        //,oldertoken : older_token
        });
      }   

    }

  });
});

authapp.use('/auth', authenticateRoutes);
module.exports = authenticateRoutes;