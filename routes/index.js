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

module.exports = router;
