const router = require("express").Router();
const {
  models: { Product, User, Order },
} = require("../db");
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
router.put("/:id", async (req, res, next) => {
  const { userId, productId } = req.body;
  console.log("shfiaohguqeg>>>>>>>>", req.body);
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

    let orderInCart = {};
    let productList = userCart.orders[0].products;

    if (userCart.orders.length) {
      orderInCart = userCart.orders[0];

      let productIndex = productList.findIndex((product) => {
        product.id === req.body.id;
      });

      if (productIndex !== -1) {
        userCart.orders[productIndex].quantity =
          productList[productIndex].order_product.quantity + req.body.quantity;
        productList[productIndex].order_product.unit_price = req.body.price;
        productList[productIndex].total =
          productList[productIndex].order_product.quantity * req.body.price;
        productList[productIndex].subtotal = productList[productIndex]
          .map((product) => product.total)
          .reduce((accumulator, current) => accumulator + current);
      }
      // remainder of code goes here

      res.send(req.body);
    } else {
      await Order.create({ status: "open" });
    }

    //parent.addChild()
  } catch (error) {
    next(error);
  }
});
