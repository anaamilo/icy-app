const express = require('express');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const User = require('../models/User');
const router = express.Router();
const passport = require("passport");
const multer = require('multer');
const upload = multer({ dest: './public/images/uploads/' });
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('auth/signup', {
    message: req.flash('error')
  });
});

router.post('/signup', [ensureLoggedOut(), upload.single('photo')],passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login', {
    message: req.flash('error')
  });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/auth/login',
  failureFlash : true
}));

router.get('/logout', ensureLoggedIn('/auth/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
