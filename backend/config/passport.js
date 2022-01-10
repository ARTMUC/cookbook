const LocalStrategy = require("passport-local").Strategy;
const CustomError = require("../errors/CustomError");
const { UserRepository } = require("../api/userApi/repository/userRepoSQL");
const passport = require("passport");
const { verifyPassword } = require("../utils/passwordCrypto");

const repository = new UserRepository();

const passportSetup = (app) => {
  const strategy = new LocalStrategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        const user = await repository.getUserByEmail(email);
        await verifyPassword(password, user.password);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  );

  passport.use(strategy);

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await repository.getUserById(id);

      const userInformation = {
        email: user.email,
        isEmailConfirmed: user.isEmailConfirmed,
        id: user.id,
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
