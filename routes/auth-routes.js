const express = require('express');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const User = require('../models/User');
const router = express.Router();

/* GET auth route login form */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);

  if (req.body.username === "" || req.body.password === "") {
    return res.render('signup');
  }

  User.findOne({"username": req.body.username }, "username", (err, user) => {
    if (user !== null) {
      console.log("EL usuario existe");
      return res.render('signup');
    }
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username:req.body.username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup");
      } else {
        console.log("OK");
        res.redirect("/");
      }
    });
  });
});


/* GET auth route login form */
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

/* GET auth route login form */
router.post('/login', function(req, res, next) {
  console.log(req.body);

  let username = req.body.username;
  let password = req.body.password;

  if (username === "" || password === "") {
    return res.render("login");
  }

  User.findOne({ "username": username }, (err, user) => {
    if(err){
      return res.render("login");
    }else{
      console.log(user);
      if(bcrypt.compareSync(password,user.password)){
        console.log("Password correcto");

        return res.redirect("/");
      }else{
        console.log("Password incorrecto");
        return res.render("auth/login");
      }
    }

  });

});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("./login");
});


module.exports = router;
