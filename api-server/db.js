const { Pool } = require("pg");

const pool = new Pool({
  user: "honey",
  database: "honey",
  password: "45432dfdf*dfdfl",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };
