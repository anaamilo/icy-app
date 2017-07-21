const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require('../models/User');
const path = require('path');
const debug = require('debug')(`icy-app:${path.basename(__filename).split('.')[0]}`);


passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    //debug(user);
    if (err) {return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    //debug('you are logged in');
    return next(null, user);
  });
}));

passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
        User.findOne({
            'username': username
        }, (err, user) => {
          debug(req.body);
          debug(req.file);
            if (err){ return next(err); }

            if (user) {
                return next(null, false);
            } else {
                // Destructure the body
                const { username, email, password, age, address } = req.body;
                // or /images/empty-profile.png
                const picPath = (req.file) ? `/images/uploads/${req.file.filename}` : '';
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
                const newUser = new User({
                  username,
                  email,
                  password: hashPass,
                  age,
                  address,
                  picPath
                });

                newUser.save((err) => {
                    if (err){ next(null, false, { message: newUser.errors }); }
                    return next(null, newUser);
                });
            }
        });
    });
}));
