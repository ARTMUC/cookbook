const LocalStrategy = require("passport-local").Strategy;
const CustomError = require("../errors/CustomError");
const { UserRepository } = require("../api/userApi/repository/userRepo");
const passport = require("passport");
const { verifyPassword } = require("../utils/passwordCrypto");

const Repository = new UserRepository();

const passportSetup = (app) => {
  const strategy = new LocalStrategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        const user = await Repository.GetUser({ email });
        await verifyPassword(password, user.password);
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
      const user = await Repository.GetUser({ _id: id });
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

  app.use(passport.initialize());
  app.use(passport.session());
};

const loginLocalStrategyMidd = passport.authenticate("local");

module.exports = { passportSetup, loginLocalStrategyMidd };
