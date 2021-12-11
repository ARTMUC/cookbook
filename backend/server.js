const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const port = process.env.PORT;
const {expressApp} = require('./expressApp');

(async () => {
  try {
    const app = express();
    await expressApp(app);
    await connectDB();
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();




