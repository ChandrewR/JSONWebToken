var express = require('express');
var expapp = express();
var apiRoutes = express.Router(); 
var User   = require('../models/user');
var bodyParser  = require('body-parser');
expapp.use(bodyParser.urlencoded({ extended: false }));
//expapp.use(bodyParser());
expapp.use(bodyParser.json());

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
apiRoutes.post('/addUser', function(req, res) {


	console.log("admin:"+req.body.admin);

	if(req.body.admin === undefined) {
		req.body.admin = 'off';
	}
  // create a sample user
/*  var user = new User({ 
    name: 'Test', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true,name : user.name });
  });*/

  res.json({success : true, name:req.body.username,admin:req.body.admin});
}); 

// apply the routes to our application with the prefix /api
expapp.use('/api', apiRoutes);
module.exports = apiRoutes;