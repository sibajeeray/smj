const express = require('express');
const { check, body } = require('express-validator/check');
const path = require('path');
const User = require('../models/user');
var reg= `([A-Z])\w+([a-z])\w+([0-9])\w+.@anz.com`;

const authController = require('../controllers/authentication');

const router = express.Router();

router.post(
  '/register',
  [
    check('emailsignup')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value !== reg) {
        //   throw new Error('This email address is not allowed.');
        // }
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please choose a different one.'
            );
          }
        });
      }),
    body(
      'passwordsignup',
      'Please enter a password with only numbers and text and at least 6 characters.'
    )
      .isLength({ min: 6 })
      .isAlphanumeric(),
    body('passwordsignup_confirm').custom((value, { req }) => {
      if (value !== req.body.passwordsignup) {
        throw new Error('Passwords do not match! Try again');
      }
      return true;
    })
  ],
  authController.postSignup
);

router.get('/login', authController.getLogin);

router.post('/admin-validation', authController.postAdminLogin);

router.get('/sign-up-in',authController.getSignup);

router.post(
  '/login_validation',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.'),
    body('password', 'Password has to be valid.')
      .isLength({ min: 6 })
      .isAlphanumeric()
  ],
  authController.postLogin
);

// router.post('/register', authController.postSignup);

// router.get('/logout', authController.getLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;