const passport = require('passport');
const User = require('../models/User');

exports.registerForm = (req, res) => {
    res.render('register', {
      title: 'Register',
      warning: '',
    });
  };
  
  exports.register = (req, res, next) => {
    const user = new User({ username: req.body.username });
  
    User.register(user, req.body.password, (err, account) => {
      if (err) {
        // needed to say 'return' below otherwise node will complain that headers already sent.
        return res.render('register', {
          title: 'Register',
          warning: 'Sorry, that username is already taken.  Try again.',
        });
      }
      next(); /* success */
    });
  };