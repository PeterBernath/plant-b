const Sequelize = require('sequelize');
const { Op } = require('sequelize')
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('./models/User');
const { Order } = require('./models/Order');

const host = process.env.MYSQL_HOST || "localhost";
const sequelize = new Sequelize(`mariadb://root:@${host}:3306/plantb`);
const jwtSecret = 'LKhsfdkashflkgksaufghjhsadfk';

const registerUser = (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  console.log('req.body', req.body);
  sequelize.sync()
    .then(() => User.create({
      first_name,
      last_name,
      username,
      password
    }))
    .then((user) => {
      console.log(user.toJSON());
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
    }) 
};

const newOrder = (req, res) => {
  let { username, date, cart } = req.body;
  cart = JSON.stringify(cart);
  date = new Date(date);
  sequelize.sync()
    .then(() => Order.create({
      username,
      order_date: date,
      cart
    }))
    .then((order) => {
      console.log(order.toJSON());
      res.json({ success: true });
    })
    .catch((e) => {
      console.log(e);
      res.json({ success: false });
    }) 
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username } }).then((result) => {
    return { dbUsername: result.dataValues.username, dbPassword: result.dataValues.password };
  })
    .then((data) => {
      console.log(data);
      const { dbUsername, dbPassword } = data;
      console.log(username, password);
      bcrypt.compare(password, dbPassword, (error, response) => {
        console.log(response);
        if (username && password) {
          if (username === dbUsername && response) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            const token = jwt.sign({ username },
              jwtSecret,
              { expiresIn: 60 * 60 * 24 });
            res.json({
              success: true,
              message: 'Authentication successful!',
              token
            });
          }
          else {
            res.json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
        }
      });
    });
};

const getAllOrders = (req, res) => {
  Order.findAll({
    where: {
      order_date: {
        [Op.gt]: moment().toDate() 
      }
    }, 
    order: [
      ['order_date', 'ASC']
    ] 
  })
    .then((result) => {
      return result;
    })
    .then((data) => {
      res.json({
        success: true,
        message: 'Orders supplied',
        data
      });
    });
};

module.exports = {
  registerUser,
  login,
  newOrder,
  getAllOrders,
};
