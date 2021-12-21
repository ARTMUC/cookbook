const User = require("../models/User");

const isEmailConfirmed = async (req, res, next) => {
  if (req.user.isEmailConfirmed != 1) {
    res.json("please confirm your email first");

    // rewrite res.json so that it's sending meeage to frontend and a status code !!!!!!!!!!
  } else {
    next();
  }
};

module.exports = isEmailConfirmed;
