const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const session = require("express-session");
const app = express();
const cors = require("cors");

// Mengatur view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Menambahkan middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "2873hjj33hhjherhkjhsHIJh-ojfs0khnjkhs",
    resave: false,
    saveUninitialized: false,
  }),
  cors({
    origin: "*",
  })
);

// Mengatur routing
app.use("/", indexRouter);
app.use("/addPlayer", indexRouter);
app.use("/game", indexRouter);
app.use("/game/snake", indexRouter);
app.use("/about", indexRouter);
app.use("/db/leaderboard/snake", indexRouter);
app.use("/db/leaderboard/tictactoe", indexRouter);
app.use("/game/snake/add/score", indexRouter);

// Menangani error 404
app.use(function (req, res, next) {
  res.status(404).render("error", { message: "Halaman tidak ditemukan" });
});

// Menangani error server
app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .render("error", { message: "Terjadi kesalahan pada server" });
});

app.listen(5000);
console.log("Server Started...");
