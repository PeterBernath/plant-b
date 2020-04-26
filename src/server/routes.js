const express = require('express');

const router = express.Router();
const middlewares = require('./middlewares');

router.post('/register', middlewares.registerUser);

router.post('/login', middlewares.login);

router.post('/new-order', middlewares.newOrder);

router.get('/orders', middlewares.getAllOrders);

router.post('/fb-login', middlewares.getAccessToken);

module.exports = router;
