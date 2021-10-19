const express = require("express");
const passport = require("passport");
const router = express.Router();
const { register, logout, login } = require("../controller/auth");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.get("/logout", logout);

module.exports = router;
