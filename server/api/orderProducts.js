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

router.put('/:userId', async (req, res, next) => {
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
    if (userCart === null) {
      // no order, so we need to create one and add a product to the order
      const newOrder = await Order.create({ status: "open" });
      // order needs to be associated with user
      const user = await User.findByPk(req.params.userId);
      // add this newly opened order to the appropriate user
      await newOrder.setUser(user);

      await Order_Products.create({
        quantity: req.body.quantity,
        unit_price: req.body.unit_price,
        productId: req.body.id,
        orderId: newOrder.id,
        // ^ if user doesn't have id, can set the order id based on the id of the recently created order
      });
    } else if (userCart.orders.length) {
      const productInCart = await Order_Products.findOne({
        where: {
          //if we have an order in the cart, check if the productId on an order product matches the incoming id
          productId: req.body.id,
          orderId: userCart.orders[0].id,
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
          productId: req.body.id,
          orderId: userCart.orders[0].id,
          // ^ if user has an order, can set orderId using the existing order's id here
        });
      }
    }

    let productList = userCart.orders[0].products;
    res.send(productList);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:userId/:productId

router.delete('/:userId/:productId', async (req, res, next) => {
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
            status: 'open',
          },
        },
      ],
    });
    if (!user) {
      res.sendStatus(404);
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
