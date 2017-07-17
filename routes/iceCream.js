const express  = require('express');
const Campaign = require('../models/IceCream');
const router   = express.Router();

router.get('/new', (req, res) => {
  res.render('IceCream/new');
});


module.exports = router;
