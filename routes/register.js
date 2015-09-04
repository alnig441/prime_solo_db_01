var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req, res, next){
    res.sendFile(path.resolve(__dirname, '../views/register.html'));
});

router.post('/', function(req, res, next){
    User.create(req.body, function(err, post){
        if(err)
            next(err);
        else
            res.redirect('/users');
    })
});

module.exports = router;