var express = require('express');
var router = express.Router();
var path = require('path');
var Users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('in users route ', req.session.flash);
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    res.render(path.resolve(__dirname, '../views/users.jade'),{flash: {message: req.flash('message')}});
  }
  else{
    var message = req.flash('message', 'Please log in');
    console.log('in users route, fail :', req.session.flash);
    res.render(path.resolve(__dirname, '../views/index.jade'),{flash: {message: req.flash('message')}});
  }

});

module.exports = router;
