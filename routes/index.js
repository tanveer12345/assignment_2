/*
File name: index.js
Author's name: Tanveer
Website name: azuresite.com
File Description: This file is to get pages. 

*/

var express = require('express');
const carController = require('../controllers/carsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', carController.homePage);

router.get('/cars', carController.getCars);

router.get('/admin', authController.isLoggedIn, carController.admin);
router.get('/admin/edit/:id', carController.editCar);
router.post('/admin/edit/:id', carController.updateCar);
router.get('/admin/delete/:id', carController.deleteCar);

router.get('/add', authController.isLoggedIn, carController.addCar);
router.post('/add', authController.isLoggedIn, carController.createCar);

router.get('/register', userController.registerForm);
router.post('/register', userController.register, authController.login);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/cars');
});

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
