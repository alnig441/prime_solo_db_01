var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req, res, next){
    res.render(path.resolve(__dirname, '../views/admin.jade'));
});

router.post('/', function(req, res, next){
    console.log(req.body);
    Users.create(req.body, function(err, post){
        if(err)
            next(err);
        else
            res.redirect('/users');
    })
});

router.delete('/:id', function (req, res, next) {
    console.log(req.params.id);
/*
    User.findOne({id: req.params.id}, function (err, user) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            user.remove(function (err) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    res.send(200);
                }
            });
        }
    })
*/
});


module.exports = router;