const { Pool } = require("pg");

const pool = new Pool({
  user: "honeypot_user",
  database: "honeypotdb",
  password: "weeoiio459drv",
  port: 5432,
  host: "139.144.66.64",
});

module.exports = { pool };
