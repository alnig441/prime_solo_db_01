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
                var usersArray = [];
                users.forEach(function(elem, index, array){
                    var user = {};
                    user.username = elem.username;
                    user.firstname = elem.firstname;
                    user.lastname = elem.lastname;
                    user.email = elem.email;
                    user.id = elem._id;
                    usersArray.push(user);
                });
                console.log(usersArray);
                res.send(usersArray);
            }
        });
    }
});

module.exports = router;
