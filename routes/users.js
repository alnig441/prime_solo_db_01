var express = require('express');
//var router = require('router');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next){
  res.json(req.isAuthenticated());
});


module.exports = router;
