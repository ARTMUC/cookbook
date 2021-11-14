const CustomError = require("../errors/CustomError");

const confirmLoggedIn = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomError("you are not logged in", 401);
    }
  return next()
  } catch (error) {
    return next(error);
  }
};

module.exports = confirmLoggedIn;
