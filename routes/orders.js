const express  = require('express');
const Order = require('../models/Order.js');
const IceCream = require('../models/IceCream.js')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const router = express.Router();

router.get('/', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Order.find({}, (err, o) => {
    if(err){console.log(err);}
    res.render('orders/index', {
      title: 'My orders',
      orders: o
    });
  });
});

router.get('/new', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Order.find({}, (err, o) => {
    IceCream.find({}, (err, i) => {
      res.render('orders/new', {
        title: 'Create a new order',
        order: o,
        flavours: i
      });
    });
  });
});

router.post('/new', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const o = new Order({
    creator: req.body.creator,
    type: req.body.type,
    product1: req.body.product1,
    product2: req.body.product2,
    product3: req.body.product3,
    totalPrice: req.body.totalPrice
  });
  o.save((err, obj) => {
    console.log("Saved!");
    res.redirect('/orders');
  });
});

router.post('/price', (req, res, next) => {
  console.log(req.body);
})

router.get('/:id/edit', ensureLoggedIn('/auth/login'), (req, res, next) => {
  Order.findById(req.params.id, (err, o) => {
    if(err){console.log(err);}
    res.render('orders/edit', {
      title: 'Edit here your order',
      order: o
    });
  });
});

router.post('/:id/edit', (req, res, next) => {
  const {type,product1,product2,product3} = req.body;
  const updates = {
    type,
    product1,
    product2,
    product3
  };
  Order.findByIdAndUpdate(req.params.id, updates, (err, o) => {
    if(err) { console.log(err); }
    console.log('It edits!');
    res.redirect('/orders');
  });
});

// cru[D]
router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndRemove(id, (err, obj) => {
    if(err){ return next(err); }
    res.redirect("/orders");
  });
});
module.exports = router;
