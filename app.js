require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')(`icy-app:${path.basename(__filename).split('.')[0]}`);
const mongoose = require('mongoose');
const flash = require('connect-flash');

const expressLayouts = require('express-ejs-layouts');
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo')(session);
const index = require('./routes/index');
const flavours = require('./routes/flavours');
const orders = require('./routes/orders');
const User = require('./models/User');
const authRoutes = require("./routes/auth-routes");

const app = express();

app.use(expressLayouts);
app.set('layout', 'layout/main');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({
  secret: "basic-auth-secret",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

require('./passport/config');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', index);
app.use('/auth', authRoutes);
app.use('/flavours', flavours);
app.use('/orders',orders);

mongoose.connect(process.env.MONGO_DB_URL).then( () => debug('DB Connected!'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
