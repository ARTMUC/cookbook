const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const CustomError = require("../errors/CustomError");

module.exports = (passport) => {
  const strategy = new LocalStrategy(
    {
      usernameField: "email",
      //  passwordField: 'passwd',
    },

    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new CustomError("Wrong email or password", 401);
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw new CustomError("Wrong email or password", 401);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  );

  passport.use(strategy);

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });



  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw new CustomError("Wrong email or password", 401);
      }
      const userInformation = {
        email: user.email,
        isEmailConfirmed: user.isEmailConfirmed,
        id: user._id,
      };
      done(null, userInformation);
    } catch (error) {
       done(error);
    }
  });

};
