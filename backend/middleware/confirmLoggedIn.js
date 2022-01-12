const CustomError = require("../errors/CustomError");
const passport = require("passport");

//this is for session
// const confirmLoggedIn = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       throw new CustomError("you are not logged in", 401);
//     }
//   return next()
//   } catch (error) {
//     return next(error);
//   }
// };

// this is for jwt

function confirmLoggedIn(req, res, next) {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) return next(err);
    if (!user) throw new CustomError("you are not logged in", 401);
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = confirmLoggedIn;
