const express = require('express');

const router = express.Router();
const middlewares = require('./middlewares');

router.post('/register', middlewares.registerUser);

router.post('/login', middlewares.login);

module.exports = router;
