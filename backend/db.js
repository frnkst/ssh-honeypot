const { Pool } = require("pg");

console.log("all env: ", process.env)

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
});

module.exports = { pool };
