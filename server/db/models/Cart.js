const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false, // if there is a value in the cart, it should be 1 or more since
    validate: {
      min: 0,
      max: 100
    }
  },
  purchased: {
    type: Sequelize.BOOLEAN
  }
})
// assumption: product Id and user Id will be added automatically as columns via associations in the db index.js

module.exports = Cart
