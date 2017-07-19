const express  = require('express');
const Order = require('../models/Order.js');

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('orders/index', {
      title: 'Your Order - INDEX',
    });
});

module.exports = router;
