var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var flash = require('connect-flash');

var User = require('./models/user');
var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');

var app = express();

var mongoURI = 'mongodb://localhost:27017/prime_solo_db_01';
var MongoDB = mongoose.connect(mongoURI).connection;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUnitialized: false,
  cookie: { maxAge: 60000, secure: false }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy({
          passReqToCallback: true,
          usernameField: 'username'
        },
        function(req, username, password, done) {
          User.findOne({username: username}, function (err, user) {
            if (err) throw err;
            if (!user) {
              var message = req.flash('message', 'Username does not exist');
              console.log('user does not exist', done);
              //return done(null, false, {message: 'Incorrect username and password.'});
              return done(null, false, message);


            }
            //test a matching password
            user.comparePassword(password, function (err, isMatch) {
              if (err) {
                console.log(err);
                throw err;
              }
              if (isMatch) {
                console.log('user and password are a match');
                var message = req.flash('message', 'Welcome '+  user.firstname + ', you are now signed in');
                return done(null, user, message);
              }else{
                var message = req.flash('message', 'Incorrect passowrd');
                //done(null, false, {message: 'Incorrect username and password.'});
                done(null, false, message);
              }


            });
          });
        }));


passport.serializeUser(function(user, done){
  //console.log('serializing ', user)
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  //console.log("deserializing ", id);
  User.findById(id, function(err, user){
    if(err) done(err);
    done(null, user);
  });
});



MongoDB.on('error', function (err){
  console.log('mongodb conncection error, err');
});
MongoDB.once('open', function I(){
   console.log('mongodb connection open');
});



app.use('/', routes);
app.use('/users', users);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
