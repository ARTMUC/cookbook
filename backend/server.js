const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const { expressApp } = require("./expressApp");

//databases
// const connectDB = require("./db/connect");- i'm no longer using mongo

(async () => {
  try {
    const app = express();
    await expressApp(app);
    // await connectDB(); - i'm no longer using mongo
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();
