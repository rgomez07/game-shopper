const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
    },
    platform: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    genre: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT,
        defaultValue: './images/Game_placeholder.png'
    },
    esrb: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        unique: true,
        
    },
    players: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    }

  })
  
module.exports = Product
