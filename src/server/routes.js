const express = require('express');

const router = express.Router();
const middlewares = require('./middlewares');

router.post('/register', middlewares.registerUser);

router.post('/login', middlewares.login);

router.post('/new-order', middlewares.newOrder);

module.exports = router;
