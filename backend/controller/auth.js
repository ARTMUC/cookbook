const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodeMailer = require("../config/nodemailer");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

const rndmBytes = promisify(randomBytes);

const register = async (req, res) => {
  const { email, password } = req.body;
    try {
      const doc = await User.findOne({ email })
      if (doc) res.json("User Already Exists");
      if (!doc) {
        const randomValue = await rndmBytes(16);
        const randomString = randomValue.toString("hex");

        const confirmationEmailText = `localhost:5000/api/v1/auth/confirm/${randomString}`;
        const confirmationEmailHTML = `<a href=\"http://localhost:5000/api/v1/auth/confirm/${randomString}\">Hello ${email} click here to confirm email </a>`;
        const confirmationEmailSubject = "CookBook - please confirm your email ✔";

        nodeMailer(email, confirmationEmailText, confirmationEmailHTML, confirmationEmailSubject); // add random url generator, add this value to DB, send the value thru email, add new route to verify email adress
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          email: email,
          password: hashedPassword,
          isEmailConfirmed: false,
          confirmation_Id: randomString,
        });
        await newUser.save((err) => {
          if (err) {
            res.json(err.message);
          } else {
            res.json("Check your inbox. We've sent you email with confirmation link.");
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.json("err");
      return;
    }
 
};

const login = async (req, res) => {
  res.json("you are logged in"); // login function is taken care of by passport.js entirerly ... don't bother with this for now
};

const logout = async (req, res) => {
  req.logout(); // logout function is taken care of by passport.js entirerly ... don't bother with this for now
  res.send("success");
};

const confirm = async (req, res) => {
  const receivedConfirmationId = `${req.params.no}`;

  try {
    const doc = await User.findOneAndUpdate(
      { confirmation_Id: receivedConfirmationId },
      { isEmailConfirmed: true }
    );

    if (!doc)
      res.send(
        "Your confirmation link doesn't work. Please contact Administartor."
      );
    if (doc) {
      res.send("email confirmed");
    }
  } catch (error) {
    console.log(error);
    res.send("err");
    return;
  }
};

module.exports = {
  register,
  login,
  logout,
  confirm,
};
