const router = require("express").Router();
const {
  models: { Product, User, Order },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const userCart = await User.findByPk(req.params.id, {
      include: [
        {
          // join it with corresponding open order
          model: Order,
          where: {
            status: "open",
          },
          // join it with corresponding product(s)
          include: [
            {
              model: Product,
            },
          ],
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
