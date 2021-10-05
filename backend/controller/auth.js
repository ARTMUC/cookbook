const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async (req, res) => {
  const { email: username, password } = req.body;

  User.findOne({ username }, async (err, doc) => {
    try {
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
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

const logout = async (req, res) => {
  req.logout();
  res.send("success");
};

module.exports = {
  register,
  logout,
};
