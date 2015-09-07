var express = require('express');
var router = express.Router();
var path = require('path');
var Users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('in display route ',req.session);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        Users.find({}, function(err, users) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                console.log('In display router returning data: ', users);
                //res.send({user:users});
                res.send(users);
            }
        });
    };
});

module.exports = router;
