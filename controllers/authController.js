const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');



exports.login = passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login',
  });

  exports.googlePre = passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  });
  
  exports.googlePost = passport.authenticate('google', {
    successRedirect: '/admin',
    failureRedirect: '/login'
  });