const Sequelize = require('sequelize');

const sequelize = new Sequelize('mariadb://root:@localhost:3306/plantb');
class User extends Sequelize.Model {}

const initUser = () => {
  User.init({
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
  }, { sequelize, modelName: 'user' });
  sequelize.sync()
    .then(() => console.log('User table initialized'));
};

module.exports = {
  User,
  initUser,
};
