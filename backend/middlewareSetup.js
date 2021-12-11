
const session = require("express-session");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const middlewareSetup = (app) => {

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

   
    
}

module.exports = {middlewareSetup}