const express  = require('express');
const IceCream = require('../models/IceCream.js');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/uploads/' });
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

// c[R]ud
router.get('/', ensureLoggedIn('/auth/login'), (req, res, next) => {
  console.log(req.user);
  IceCream.find({}, (err, f) => {
    if(err){console.log(err);}
    res.render('flavours/index', {
      title: 'All flavours - INDEX',
      flavours: f
    });
  });
});

// c[R]ud
router.post('/filter', (req, res, next) => {
  IceCream.find(JSON.parse(req.body.filter), (err, f) => {
      if(err){console.log(err);}
      res.send(JSON.stringify(f));
  });
});

// // c[R]ud
// router.get('/lactose', (req, res, next) => {
//   IceCream.find({hasLactose:false}, (err, f) => {
//       if(err){console.log(err);}
//       res.send(JSON.stringify(f));
//   });
// });

// // c[R]ud
// router.get('/egg', (req, res, next) => {
//   IceCream.find({hasEgg:false}, (err, f) => {
//       if(err){console.log(err);}
//       res.send(JSON.stringify(f));
//   });
// });

// // c[R]ud
// router.get('/nuts', (req, res, next) => {
//   IceCream.find({hasNuts:false}, (err, f) => {
//       if(err){console.log(err);}
//       res.send(JSON.stringify(f));
//   });
// });

// c[R]ud
router.get('/new', ensureLoggedIn('/auth/login'), (req, res, next) => {
  IceCream.find({}, (err, f) => {
    res.render('flavours/new', {
      title: 'Add a new flavour',
      flavour: f
    });
  });
});

// [C]rud
router.post('/new', [upload.single('photo'), ensureLoggedIn('/auth/login')], (req, res, next) => {
  const f = new IceCream({
    name: req.body.name,
    flavour: req.body.flavour,
    description: req.body.description,
    hasLactose: req.body.hasLactose,
    hasEgg: req.body.hasEgg,
    hasNuts: req.body.hasNuts,
    picPath: `/images/uploads/${req.file.filename}`,
    picName: req.file.originalname
  });
  f.save((err, obj) => {
    console.log("Saved!");
    res.redirect('/flavours');
  });
});

// c[R]ud
router.get('/:id', ensureLoggedIn('/auth/login'), (req, res, next) => {
  IceCream.findById(req.params.id, (err, f) => {
    if(err){console.log(err);}
    res.render('flavours/detail', {
      title: 'Flavour',
      flavour: f
    });
  });
});

// cr[U]d
router.get('/:id/edit', [upload.single('photo'), ensureLoggedIn('/auth/login')], (req, res, next) => {
  IceCream.findById(req.params.id, (err, f) => {
    if(err){console.log(err);}
    res.render('flavours/edit', {
      title: 'Edit here your flavour',
      flavour: f
    });
  });
});

// cr[U]d
router.post('/:id/edit', (req, res, next) => {
  const { name, flavour, description, hasLactose, hasEgg, hasNuts, picPath } = req.body;
  const updates = {
    name,
    flavour,
    description,
    hasLactose,
    hasEgg,
    hasNuts,
    picPath
  };
  IceCream.findByIdAndUpdate(req.params.id, updates, (err, f) => {
    if(err) { console.log(err); }
    console.log('It edits!');
    res.redirect(`/flavours/${f._id}`);
  });
});

// cru[D]
router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  IceCream.findByIdAndRemove(id, (err, obj) => {
    if(err){ return next(err); }
    res.redirect("/flavours");
  });
});

module.exports = router;
