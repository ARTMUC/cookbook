const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodeMailer = require("../config/nodemailer");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const CustomError = require("../errors/CustomError");

const rndmBytes = promisify(randomBytes);

const register = async (req, res, next) => {
  try {
    const { email, password } = req?.body;
    if (!email || !password) {
      throw new CustomError("Email and Password required", 400);
    }
    const doc = await User.findOne({ email });
    if (doc) {
      throw new CustomError("User already exists", 400);
    }
    if (!doc) {
      const randomValue = await rndmBytes(16);
      const randomString = randomValue.toString("hex");

      const confirmationEmailText = `localhost:5000/api/v1/auth/confirm/${randomString}`;
      const confirmationEmailHTML = `<a href=\"http://localhost:5000/api/v1/auth/confirm/${randomString}\">Hello ${email} click here to confirm email </a>`;
      const confirmationEmailSubject = "CookBook - please confirm your email ✔";

      email &&
        (await nodeMailer(
          email,
          confirmationEmailText,
          confirmationEmailHTML,
          confirmationEmailSubject
        ));
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: email,
        password: hashedPassword,
        isEmailConfirmed: false,
        confirmation_Id: randomString,
      });
      await newUser.save();
      res.status(201).json({
        message:
          "Check your inbox. We've sent you email with confirmation link.",
      });
    }
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
    req.logout(); // logout function is taken care of by passport.js entirerly ... don't bother with this for now
    res.status(200).json({ message: "you are logged out" });
  } catch (error) {
    return next(error);
  }
};

const confirmEmail = async (req, res, next) => {
  const receivedConfirmationId = `${req.params.no}`;

  try {
    const doc = await User.findOneAndUpdate(
      { confirmation_Id: receivedConfirmationId },
      { isEmailConfirmed: true }
    );

    if (!doc) {
      throw new CustomError(
        "Your confirmation link doesn't work. Please contact Administartor.",
        401
      );
    }
    if (doc) {
      res.status(200).send("email confirmed");
    }
  } catch (error) {
    return next(error);
  }
};

// const confirmLoggedIn = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       throw new CustomError("you are not logged in", 401);
//     }
//     const responseObj = {
//       user: req.user,
//       message: "you are logged in",
//     };
//     res.status(200).json(responseObj);
//   } catch (error) {
//     return next(error);
//   }
// };

module.exports = {
  register,
  login,
  logout,
  confirmEmail,
};
