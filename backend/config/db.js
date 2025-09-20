const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dateStrings: ["DATE", "DATETIME", "TIMESTAMP"],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds
  idleTimeout: 25200, // 7 hours (25,200 seconds)
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000, // 30 seconds
});

pool.on("error", (err) => {
  console.error("Error in connection pool:", err);
});

pool.on("close", () => {
  console.log("Connection pool closed");
});

pool.on("connection", (conn) => {
  conn.query("SET time_zone = '-06:00'");
});

module.exports = pool;
