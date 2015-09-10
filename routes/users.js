var express = require('express');
var router = express.Router();
var path = require('path');
var Users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
//  console.log('in users route ', req.session.flash);
  console.log(req.isAuthenticated());

  console.log(req.session);
  if(req.isAuthenticated() && req.user.admin) {
    res.render(path.resolve(__dirname, '../views/superuser.jade'),{flash: {message: req.flash('message')}});
  }
  else if((req.isAuthenticated())&& (!req.user.admin)){
    res.render(path.resolve(__dirname, '../views/users.jade'), {flash: {message: req.flash('message')}});
  }
  else{
    var message = req.flash('message', 'Please log in');
    console.log('in users route, fail :', req.session.flash);
    res.render(path.resolve(__dirname, '../views/index.jade'),{flash: {message: req.flash('message')}});
  }

});

router.get('/logout',function(req, res, next){
  console.log('killing session');
  req.logout();
  var message = req.flash('message', 'You have succesfully logged out');
  console.log(req.isAuthenticated());
  //res.send({flash: {message: req.flash('message')}});
  res.render(path.resolve(__dirname, '../views/index.jade'),{flash: {message: req.flash('message')}});

});


module.exports = router;
