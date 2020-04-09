const { Sequelize, DataTypes, Model } = require('sequelize');

const host = process.env.MYSQL_HOST || "localhost";
const sequelize = new Sequelize(`mariadb://root:@${host}:3306/plantb`);

class Order extends Model {}

const initOrder = () => {
  Order.init({
    username: { type: DataTypes.STRING, allowNull: false},
    order_date: { type: DataTypes.DATE },
    cart: { type: DataTypes.TEXT }
  }, { sequelize, modelName: 'order' });
  sequelize.sync()
    .then(() => console.log('Order table initialized'));
};

module.exports = {
  Order,
  initOrder,
};
