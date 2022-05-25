const { pool } = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 3000;

app.get("/all", async (req, res) => {
  const query = "SELECT * FROM logins";
  const data = await getData(query);
  res.send(JSON.stringify(data.rows));
});

app.get("/usernames", async (req, res) => {
  const query =
    "SELECT username, count(*) as count FROM logins group by username order by count desc limit 20";
  const data = await getData(query);
  res.send(JSON.stringify(data.rows));
});

app.get("/passwords", async (req, res) => {
  const query =
    "SELECT password, count(*) as count FROM logins group by password order by count desc limit 20";
  const data = await getData(query);
  res.send(JSON.stringify(data.rows));
});

app.get("/recent", async (req, res) => {
  const query = "select * from logins order by timestamp desc limit 50";
  const data = await getData(query);
  res.send(JSON.stringify(data.rows));
});

app.get("/ip", async (req, res) => {
  const query =
    "select ip, count(*) from logins as count group by ip order by count desc limit 20";
  const data = await getData(query);
  res.send(JSON.stringify(data.rows));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function getData(query) {
  try {
    return await pool.query(query);
  } catch (error) {
    console.error(error);
  }
}
