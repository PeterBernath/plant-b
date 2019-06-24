const Sequelize = require('sequelize');
const { User } = require('./models/User');

const sequelize = new Sequelize('mariadb://root:@localhost:3306/plantb');

const registerUser = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  sequelize.sync()
    .then(() => User.create({
      username,
      password
    }))
    .then((jane) => {
      console.log(jane.toJSON());
    });

  res.json({ success: true });
};

module.exports = {
  registerUser,
};
