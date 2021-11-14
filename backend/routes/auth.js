const express = require("express");
const passport = require("passport");
const router = express.Router();
const { register, logout, login, confirmEmail } = require("../controller/auth");
const User = require("../models/User");
const isEmailConfirmed = require("../middleware/isEmailConfirmed");
const validateCredentials = require("../middleware/validateCredentials");
const confirmLoggedIn = require("../middleware/confirmLoggedIn");

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

router.get("/ensureLoggedIn", confirmLoggedIn, (req,res,next)=>{
  const responseObj = {
    user: req.user,
    message: "you are logged in",
  };
  res.status(200).json(responseObj);
});

module.exports = router;
