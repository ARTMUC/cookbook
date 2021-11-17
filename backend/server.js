const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();

//custom middleware
const isEmailConfirmed = require("./middleware/isEmailConfirmed");
const { errorHandling } = require("./middleware/errorHandling");
const confirmLoggedIn = require("./middleware/confirmLoggedIn");

// routers
const authRouter = require("./routes/auth");
const recipeRouter = require("./routes/recipe.js");

// database
const connectDB = require("./db/connect");

//models
const User = require("./models/User");
const Recipe = require("./models/Recipe");

//passport
require("./config/passport")(passport);

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "secretcode", // need to move to the .env file!!!!!!!!!!!!!!!!!!!!!!!!!
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httponly: true },
  })
);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipe", confirmLoggedIn, isEmailConfirmed, recipeRouter);

app.use(errorHandling);


