const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.users.userType === 'Admin') {
    next();
  } else {
    res.status(403).send('You are not authorized to access this page');
  }
};

module.exports = isAdmin;
