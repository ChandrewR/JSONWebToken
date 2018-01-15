var express = require('express');
var authapp = express();
var authenticateRoutes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
authenticateRoutes.get('/test', function(req, res) {
  res.json({
        success: true,
        message: 'Enjoy your token!'
        });
});

/*authenticateRoutes.post('/authenticate', function(req, res) {

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
    
    var token = jwt.sign(payload, app.get('superSecret'), {
        expiresInMinutes: 1440 // expires in 24 hours
    });

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
        });
      }   

    }

  });
});*/

authapp.use('/api', authenticateRoutes);
module.exports = authenticateRoutes;