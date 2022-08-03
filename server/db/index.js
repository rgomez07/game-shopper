//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Order = require("./models/Order");
const Product = require("./models/Products");
const Order_Products = require("./models/OrderProduct");

//associations could go here!

Order.belongsTo(User);
User.hasMany(Order); // assumes we have multiple lines for each different product type for a user

Product.belongsToMany(Order, { through: Order_Products });
Order.belongsToMany(Product, { through: Order_Products });

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
  },
};
