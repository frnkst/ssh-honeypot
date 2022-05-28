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

app.get("/count", async (req, res) => {
  const query15mins =
    "select count(*) from logins where timestamp > now() - interval '15 minutes'";
  const count15mins = (await getData(query15mins)).rows;

  const query1h =
    "select count(*) from logins where timestamp > now() - interval '1 hour'";
  const count1h = (await getData(query1h)).rows;

  const query24h =
    "select count(*) from logins where timestamp > now() - interval '24 hour'";
  const count24h = (await getData(query24h)).rows;

  const beginning = "select count(*) from logins";
  const countAll = (await getData(beginning)).rows;

  res.send(
    JSON.stringify({
      count15mins,
      count1h,
      count24h,
      countAll,
    })
  );
});

app.get("/passwords", async (req, res) => {
  const query =
    "SELECT password, count(*) as count FROM logins group by password order by count desc limit 20";
  const data = await getData(query);
  res.send(JSON.stringify(data.rows));
});

app.get("/attack-history", async (req, res) => {
  const query =
    "SELECT DATE_TRUNC('hour', timestamp), COUNT(*)\n" +
    "FROM logins\n" +
    "GROUP BY DATE_TRUNC('hour', timestamp) order by date_trunc asc";
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
