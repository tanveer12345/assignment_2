var express = require('express');
const carController = require('../controllers/carsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', carController.homePage);

router.get('/admin', carController.admin);

router.get('/register', userController.registerForm);
router.post('/register', userController.register);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/google', authController.googlePre);
router.get('/google/callback', authController.googlePost);


router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      ,
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  })
);

module.exports = router;
