const router = require("express").Router();
const {
  models: { Product, User, Order },
} = require("../db");
const Order_Products = require("../db/models/OrderProduct");
module.exports = router;

//get cart
router.get("/:id", async (req, res, next) => {
  try {
    const userCart = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          // join it with corresponding open order
          model: Order,
          where: {
            status: "open",
          },
          // join it with corresponding product(s)
          include: [Product],
        },
      ],
    });

    if (userCart) {
      //if we get something, cart exists --> send products in cart
      res.send(userCart.orders[0].products);
    } else {
      res.send();
    }
  } catch (err) {
    next(err);
  }
});

//add to cart
router.put("/:userId", async (req, res, next) => {
  try {
    const userCart = await User.findOne({
      where: {
        id: req.params.userId,
      },
      include: [
        {
          // join it with corresponding open order
          model: Order,
          where: {
            status: "open",
          },
          // join it with corresponding product(s)
          include: [Product],
        },
      ],
    });
    console.log("this be the userCart", userCart.orders[0].products);

    if (userCart.orders.length) {
      const productInCart = await Order_Products.findOne({
        where: {
          //if we have an order in the cart, check if the productId on an order product matches the incoming id
          productId: req.body.id,
          orderId: userCart.orders[0].products[0].orderId,
          // ^ all products in open cart have the same orderId, just need to access the value in some way
        },
      });

      //if product in cart, add quantity to existing quantity
      if (productInCart) {
        let newQuant = productInCart.dataValues.quantity + req.body.quantity;
        await productInCart.update({ quantity: newQuant });
      } else {
        //if product isn't in cart, add new product to cart
        await Order_Products.create({
          quantity: req.body.quantity,
          unit_price: req.body.unit_price,
          productId: req.body.productId,
          orderId: req.body.orderId,
        });
      }
    } else {
      // no order, so we need to create one and add product to the order
      await Order.create({ status: "open" });
      await Order_Products.create({
        quantity: req.body.quantity,
        unit_price: req.body.unit_price,
        productId: req.body.productId,
        orderId: req.body.orderId,
      });
    }

    let productList = userCart.orders[0].products;
    res.send(productList);
  } catch (error) {
    next(error);
  }
});
