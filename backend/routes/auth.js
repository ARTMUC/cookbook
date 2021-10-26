const express = require("express");
const passport = require("passport");
const router = express.Router();
const { register, logout, login, confirm } = require("../controller/auth");
const User = require("../models/User");
const isEmailConfirmed = require("../middleware/isEmailConfirmed");


router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local"),
  isEmailConfirmed,
  login
);
router.get("/logout", logout);
router.get("/confirm/:no", confirm);

module.exports = router;
