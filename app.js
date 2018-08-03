var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({ path: 'variables.env' });
const bodyParser = require('body-parser');

const passport = require('passport');
const session = require('express-session');

const localStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'some string value here',
    resave: true,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');

passport.use(User.createStrategy());

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new googleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ username: profile.emails[0].value }, (err, user) =>
      done(err, user));
  }
));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: err.message });
});

module.exports = app;
