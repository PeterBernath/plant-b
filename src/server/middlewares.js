const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('./models/User');

const sequelize = new Sequelize('mariadb://root:@localhost:3306/plantb');
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
    });

  res.json({ success: true });
};

const login = (req, res) => {
  const used = process.memoryUsage();
  for (const key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
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
        //   else {
        //     res.send(403).json({
        //       success: false,
        //       message: 'Incorrect username or password'
        //     });
        //   }
        // } else {
        //   res.send(400).json({
        //     success: false,
        //     message: 'Authentication failed! Please check the request'
        //   });
        }
      });
    });
};

module.exports = {
  registerUser,
  login,
};
