const express = require("express");
const passport = require("passport");
const router = express.Router();
const { register, logout } = require("../controller/auth");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("success");
});
router.get("/logout", logout);

module.exports = router;
