var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('in index route ', req.session.flash);
    res.render(path.resolve(__dirname, '../views/index.jade'), {flash: {message: req.flash('message')}});
});

router.post('/', passport.authenticate('local',{
  successRedirect: '/users',
  failureRedirect: '/',
    failureFlash: true
    })
);

module.exports = router;
