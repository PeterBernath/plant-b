const Sequelize = require('sequelize');

const host = process.env.MYSQL_HOST || "localhost";
const sequelize = new Sequelize(`mariadb://root:@${host}:3306/plantb`);
class User extends Sequelize.Model {}

const initUser = () => {
  User.init({
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    password: Sequelize.STRING
  }, { sequelize, modelName: 'user' });
  sequelize.sync()
    .then(() => console.log('User table initialized'));
};

module.exports = {
  User,
  initUser,
};
