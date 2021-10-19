const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodeMailer = require('../config/nodemailer')

const register = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, async (err, doc) => {
    try {
      if (doc) res.send("User Already Exists");
      if (!doc) {
        nodeMailer(email) // add random url generator, add this value to DB, send the value thru email, add new route to verify email adress
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
         email:  email,
          password: hashedPassword,
        });
        await newUser.save((err) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send("success");
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.send("err");
      return;
    }
  });
};



const login = async (req, res) => {
  res.send("success");
};




const logout = async (req, res) => {
  req.logout();
  res.send("success");
};

module.exports = {
  register,
  login,
  logout,
};
