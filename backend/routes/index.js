const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/getAll', (req, res, next) => {
    res.sendStatus(200);
});

module.exports = router;
