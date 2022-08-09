const isAdmin = require('../auth/isAdmin');
const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'userType'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//Gets a single user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id);

    res.send(singleUser);
  } catch (err) {
    next(err);
  }
});

//Put Routesn /api/users/id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Deletes a single user based off of ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteUser = await User.findByPk(req.params.id);
    await deleteUser.destroy();
    res.send(deleteUser);
  } catch (err) {
    next(err);
  }
});
