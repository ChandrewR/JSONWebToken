var express = require('express');
var expapp = express();
var apiRoutes = express.Router(); 
var User   = require('../models/user');
var SecuredUser   = require('../models/securedusers');
var bodyParser  = require('body-parser');
expapp.use(bodyParser.urlencoded({ extended: false }));
//expapp.use(bodyParser());
expapp.use(bodyParser.json());

// route to return all users (GET http://localhost:5000/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// Add a user
apiRoutes.post('/addUser', function(req, res) {

	/* if(req.body.admin === undefined) {
		req.body.admin = false;
	} else
	{
		req.body.admin = true;
  } */
  

  // create a sample user
  var user = new User({ 
    name: req.body.username, 
    password: req.body.password,
    admin: req.body.admin
  });

  var secureduser = new SecuredUser({ 
    name: req.body.username, 
    password: req.body.password,
    admin: req.body.admin
  });

  if (req.body.admin == true) {
    secureduser.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true,name : user.name });
    });
  } else {
    user.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true,name : user.name });
    });

  }

  //res.json({success : true, name:req.body.username,admin:req.body.admin});
}); 

// apply the routes to our application with the prefix /api
expapp.use('/api', apiRoutes);
module.exports = apiRoutes;