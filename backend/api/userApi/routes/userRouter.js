const express = require("express");
const router = express.Router();

const {
  register,
  logout,
  login,
  confirmEmail,
  loggedInConfirmation,
} = require("../controllers/userController");
const isEmailConfirmed = require("../../../middleware/isEmailConfirmed");
const validateCredentials = require("../../../middleware/validateCredentials");
const confirmLoggedIn = require("../../../middleware/confirmLoggedIn");
const { loginLocalStrategyMidd } = require("../../../config/passport");

router.post("/register", validateCredentials, register);
router.post(
  "/login",
  validateCredentials,
  loginLocalStrategyMidd,
  isEmailConfirmed,
  login
);
router.get("/logout", logout);
router.get("/confirm/:no", confirmEmail);

router.get("/ensureLoggedIn", confirmLoggedIn, loggedInConfirmation);

module.exports = router;
