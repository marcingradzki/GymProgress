const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

/* GET home page. */
router.get('/', (req, res) => {
  User.getAll()
    .then(data => res.send(data));
});

router.get('/all', (req, res) => {
  User.getAll()
    .then(data => res.send(data));
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.addUser({ username, password })
    .then(data => res.send(data));
});

router.post('/login',
  passport.authenticate('local'), (req, res) => {
    console.log('no i tera pa');
    res.status(200).send({});
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

module.exports = router;
