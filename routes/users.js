var express = require('express');
//var router = require('router');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log('hello ', req.user.firstname);
  //console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    console.log(req.user.firstname + ' is signed in. In jade branch');
    res.sendFile(path.resolve(__dirname, '../views/users.html'));
  }
  else{
    console.log('users route redirecting to sign-in page');
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
  }

});

module.exports = router;
