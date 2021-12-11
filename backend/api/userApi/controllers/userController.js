const { UserService } = require("../services/userService");
const CustomError = require("../../../errors/CustomError");

const Service = new UserService();

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await Service.Register({ email, password });
    res.status(201).json({
      message: "Check your inbox. We've sent you email with confirmation link.",
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    req.session.save();
    const responseObj = {
      user: req.user,
      message: "you are logged in",
    };
    res.status(200).json(responseObj);
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    req.logout(); // this object is created by PASSPORT.JS
    res.status(200).json({ message: "you are logged out" });
  } catch (error) {
    return next(error);
  }
};

const confirmEmail = async (req, res, next) => {
  const receivedConfirmationId = `${req.params.no}`;

  try {
    await Service.ConfirmUserEmail(
      { confirmation_Id: receivedConfirmationId },
      { isEmailConfirmed: true }
    );
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
