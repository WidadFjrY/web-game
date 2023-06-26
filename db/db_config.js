const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Plmokn123",
  database: "leaderboard",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected");
});

module.exports = db;
