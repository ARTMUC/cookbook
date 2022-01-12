const { UserService } = require("../services/userService");
const CustomError = require("../../../errors/CustomError");
const jwt = require("jsonwebtoken");

const service = new UserService();

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await service.register({ email, password });
    res.status(201).json({
      message: "Check your inbox. We've sent you email with confirmation link.",
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // this is for session
    // req.session.save();

    //this is for jwt
    const user = req.user;
    const token = jwt.sign(user, "jwtsecretchangeitlater", {
      expiresIn: "2h",
    });

    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        // signed: true,
        expires: new Date(Date.now() + 2 * 3600000),
      })
      .json({ user: req.user, message: "you are logged in" });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    //this is for session
    //    req.logout(); // this object is created by PASSPORT.JS
    // res.status(200).json({ message: "you are logged out" });

    res.status(200).clearCookie("authToken").json({ message: "Logged out" });
  } catch (error) {
    return next(error);
  }
};

const confirmEmail = async (req, res, next) => {
  const receivedConfirmationId = `${req.params.no}`;

  try {
    await service.confirmUserEmail(receivedConfirmationId);

    res.status(200).send("email confirmed");
  } catch (error) {
    return next(error);
  }
};

const loggedInConfirmation = async (req, res, next) => {
  try {
    const responseObj = {
      user: req.user,
      message: "you are logged in",
    };
    res.status(200).json(responseObj);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  confirmEmail,
  loggedInConfirmation,
};
