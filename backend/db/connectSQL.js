const mysql = require("mysql2/promise");
require("dotenv").config();

const mySQLPool = mysql.createPool({
  host: "localhost",
  user: "root", // get this to env
  database: "cookbook",
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  port: 3306,
});

module.exports = { mySQLPool };
