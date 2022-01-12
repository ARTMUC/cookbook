const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const CustomError = require("../errors/CustomError");
const { UserRepository } = require("../api/userApi/repository/userRepoSQL");
const passport = require("passport");
const { verifyPassword } = require("../utils/passwordCrypto");

const repository = new UserRepository();

const passportSetup = (app) => {
  const localStrategy = new LocalStrategy(
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

  const cookieExtractor = (req) => {
    if (!req.cookies["authToken"])
      throw new CustomError("you are not logged in", 401);
    const token = req && req.cookies ? req.cookies["authToken"] : null;
    return token;
  };

  const jwtStrategy = new JWTstrategy(
    {
      secretOrKey: "jwtsecretchangeitlater",
      jwtFromRequest: cookieExtractor,
    },
    async (token, done) => {
      try {
        // console.log(token);
        if (!token) throw new CustomError("you are not logged in", 401);
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  );
  passport.use(localStrategy);
  passport.use(jwtStrategy);
  app.use(passport.initialize());
};

const loginLocalStrategyMidd = passport.authenticate("local", {
  session: false,
});

module.exports = { passportSetup, loginLocalStrategyMidd };
