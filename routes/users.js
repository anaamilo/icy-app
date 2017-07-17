const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create
router.post('/', function(req, res, next) {
  console.log(req.body);
  let u = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    addres: req.body.addres,
  });
  u.save((err, obj) => {
    res.redirect('/users');
  });
});

//Retrieve
router.get('/', function(req, res, next) {
  User.find({}, (err, u) => {
    res.render('users', {
      users: p
  });
});

  // Update
  router.post('/:id/update', function(req, res, next) {
    let {name,email,age,addres} = req.body;
    let updates = {name,email,age,addres};
    console.log(updates);
    User.findByIdAndUpdate(req.params.id, updates, (err, p) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/users/${u._id}`);
    });
  });

  // Delete
  router.get('/:id/delete', function(req, res, next) {
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, obj) => {
      if (err) {
        return next(err);
      }
      res.redirect('/users');
    });
  });
});

module.exports = router;
