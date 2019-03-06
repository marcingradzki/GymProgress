const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./config/db');
const User = require('./models/User');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.getUser({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!User.validPassword(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
        return done(null, user);
    } catch (error) {
      return done(error);
    };
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) done(null, user);
});

app.use((req, res, next) => {
  const notProtectedUrls = ['/users/login', '/users/register'];
  console.log(req.url);
  if(notProtectedUrls.includes(req.url) || req.isAuthenticated()) {
    console.log('next');
    next();
  } else {
    res.sendStatus(401);
  }
});

app.use('/users', usersRouter);
app.use('/', indexRouter);

db.authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

module.exports = app;
