var express = require('express');
var router = express.Router();
const User = require('../models/users');
// const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;