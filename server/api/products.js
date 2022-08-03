const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

// GET all products /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  //productid
  try {
    let productid = req.params.id;
    let singleProduct = await Product.findByPk(productid);

    res.send(singleProduct);
  } catch (err) {
    next(err);
  }
});

//Put Routes
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Delete Routes
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});
