const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("open", "closed"),
    // if there is a value in the cart, it should be 1 or more since
  },
});
// assumption: product Id and user Id will be added automatically as columns via associations in the db index.js

module.exports = Order;
