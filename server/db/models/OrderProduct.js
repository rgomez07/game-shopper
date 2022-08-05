const Sequelize = require("sequelize");
const db = require("../db");

const Order_Products = db.define("order_product", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  unit_price: {
    type: Sequelize.INTEGER,
  },
  total_price: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order_Products;
