const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  register,
  logout,
  login,
  confirmEmail,
  confirmLoggedIn,
} = require("../controller/auth");
const User = require("../models/User");
const isEmailConfirmed = require("../middleware/isEmailConfirmed");
const validateCredentials = require("../middleware/validateCredentials");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.post("/register", register);
router.post(
  "/login",
  validateCredentials,
  passport.authenticate("local"),
  isEmailConfirmed,
  login
);
router.get("/logout", logout);
router.get("/confirm/:no", confirmEmail);
router.get("/ensureLoggedIn", ensureLoggedIn(), confirmLoggedIn);

module.exports = router;
