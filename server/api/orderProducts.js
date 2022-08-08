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
router.put("/:id", async (req, res, next) => {
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

    // let productList = userCart.orders[0].products;
    // //hardcoded 0 for testing
    // // let orderProducts = userCart.orders[0].order_product;

    // console.log("newest cart", userCart.orders);
    // if (userCart.orders.length) {
    //   //find index of user

    //   //we have an add to cart that can only increment by one
    //   const [orderProducts] = await Order_Products.findAll({
    //     where: {
    //       orderId: req.body.orderId,
    //       productId: req.body.productId,
    //     },
    //   });
    //   console.log("before", orderProducts);
    //   let increment = orderProducts.dataValues.quantity + 1;
    //   await orderProducts.update({ quantity: increment });
    //   console.log("this one", orderProducts.dataValues);

    //   // productList.push({ id: req.body.id, price: req.body.price });
    //   console.log("after increment", orderProducts.dataValues.quantity);
    // }

    // if (!userCart) {
    await Order.create({ status: "open" });

    // if (userCart.orders.length) {
    //   orderInCart = userCart.orders[0];
    //   console.log("order in cart", orderInCart);
    //   let productIndex = productList.indexOf(req.body.id);
    //   console.log(
    //     "unit pricessssssssss",
    //     productIndex,
    //     productList[productIndex]
    //     // .order_product.unit_price
    //   );

    //   if (productIndex !== -1) {
    //     userCart.orders[productIndex].quantity =
    //       productList[productIndex].order_product.quantity + req.body.quantity;
    //     productList[productIndex].order_product.unit_price = req.body.price;
    //     productList[productIndex].total =
    //       productList[productIndex].order_product.quantity * req.body.price;
    //     productList[productIndex].subtotal = productList[productIndex]
    //       .map((product) => product.total)
    //       .reduce((accumulator, current) => accumulator + current);
    //   }
    //   // remainder of code goes here

    res.send(req.body);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:userId/:productId

router.delete("/:userId/:productId", async (req, res, next) => {
  try {
    const user = await User.findOne({
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
        },
      ],
    });
    if (!user) {
      res.sendStatus(404)
    } else {
      // if user exists - if statement, else - send status 404
      const deletedProduct = await Order_Products.findOne({
        // using findOne to be sure we're only deleting one product
        where: {
          productId: req.params.productId,
          orderId: user.orders[0].id,
        },
      });

      if (!deletedProduct) {
        res.sendStatus(404);
      } else {
        await deletedProduct.destroy();
        res.send(deletedProduct);
      }
    }
  } catch (err) {
    next(err);
  }
});
