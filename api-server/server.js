const { pool } = require("./db");
const express = require('express');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const data = await retrieveData();
  res.send(JSON.stringify(data.rows));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

async function retrieveData() {
  try {
    return await pool.query("SELECT * FROM logins");
  } catch (error) {
    console.error(error);
  }
}
