const { Pool } = require("pg");

const pool = new Pool({
  user: "honeypot_user",
  database: "honeypotdb",
  password: "1234",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };
