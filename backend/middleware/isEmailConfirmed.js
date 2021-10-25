const User = require("../models/User");

const isEmailConfirmed = async (req, res, next) => {
  if (req.user.isEmailConfirmed !== true) {
    console.log(req.user)
    res.send('please confirm your email first')
  } else {
    next();
  }
};

module.exports = isEmailConfirmed;
