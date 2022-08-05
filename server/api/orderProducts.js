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

    let productList = userCart.orders[0].products;
    //hardcoded 0 for testing
    // let orderProducts = userCart.orders[0].order_product;
    let productQuant = productList[0].order_product;
    console.log("cart", userCart);
    if (userCart) {
      //find index of user

      //we have an add to cart that can only increment by one
      await userCart.update({ productQuant: productQuant.quantity++ });

      // productList.push({ id: req.body.id, price: req.body.price });
      console.log("after increment", productList[0].order_product.quantity);
    } else {
      await Order.create({ status: "open" });
    }

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

    //parent.addChild()
  } catch (error) {
    next(error);
  }
});
