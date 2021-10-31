const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn; // another package that works with passport - ensures user is logged in

require("dotenv").config();

//custom middleware

const isEmailConfirmed = require("./middleware/isEmailConfirmed");

// routers
const authRouter = require("./routes/auth");

// database
const connectDB = require("./db/connect");

//models
const User = require("./models/User");

//passport
require("./config/passport")();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "secretcode", // need to move to the .env file!!!!!!!!!!!!!!!!!!!!!!!!!
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

/*
To use Passport in an Express or Connect-based application, configure it with the required 
passport.initialize() middleware. If your application uses persistent login sessions 
(recommended, but not required), passport.session() middleware must also be used.
*/
app.use(passport.initialize());

app.use(passport.session());

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
})();

// routes
app.get("/", ensureLoggedIn(), isEmailConfirmed, (req, res) => {

const {user, isAuthenticated, cookies} = req

  res.json({user, isAuthenticated , cookies});
});

app.use("/api/v1/auth", authRouter);
