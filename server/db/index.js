//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Cart = require("./models/Cart");
const Product = require("./models/Products");

//associations could go here!

Cart.belongsTo(User);
User.hasMany(Cart); // assumes we have multiple lines for each different product type for a user

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product,
  },
};
