const express = require("express");
const router = express.Router();
const db = require("../db/db_config");

// Route beranda
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/addPlayer", (req, res, next) => {
  const userName = [];
  db.query("SELECT name FROM users", (err, result) => {
    if (err) {
      return next(err);
    }
    result.forEach((row) => {
      userName.push(row.name);
    });

    if (!userName.includes(req.body.name.toLowerCase())) {
      const user = {
        name: req.body.name.toLowerCase(),
      };
      db.query("INSERT INTO users SET ?", user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.username = req.body.name.toLowerCase();
        res.redirect("/game");
      });
    } else {
      req.session.username = req.body.name.toLowerCase();
      res.redirect("/game");
    }
  });
});

router.get("/game", (req, res, next) => {
  const username = req.session.username;
  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  if (username === "") {
    res.redirect("/");
    return;
  }

  res.render("game", {
    username: capitalizedUsername,
  });
});

router.get("/about", (req, res, next) => {
  res.render("about");
});

router.get("/db/leaderboard/snake", (req, res, next) => {
  const leaderboard = [];

  db.query(
    "SELECT name, score_snake FROM users WHERE score_snake <> 0 ORDER BY score_snake DESC LIMIT 10",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      result.forEach((data) => {
        leaderboard.push(data);
      });

      res.send(leaderboard);
    }
  );
});

router.get("/db/leaderboard/tictactoe", (req, res, next) => {
  const leaderboard = [];

  db.query(
    "SELECT name, score_tictactoe FROM users WHERE score_tictactoe <> 0 ORDER BY score_tictactoe DESC LIMIT 10",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      result.forEach((data) => {
        leaderboard.push(data);
      });

      res.send(leaderboard);
    }
  );
});

router.get("/game/snake", (req, res, next) => {
  const userAgent = req.headers["user-agent"];
  const username = req.session.username;

  let highScore = 0;

  if (username === "") {
    res.redirect("/");
    return;
  }

  if (userAgent.includes("Mobile")) {
    res.redirect("/game/m/snake/");
    return;
  }

  db.query(
    "SELECT score_snake FROM users WHERE name = ?",
    req.session.username,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error: ${err}` });
        return;
      }
      highScore = result[0].score_snake;
    }
  );

  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  setTimeout(() => {
    res.render("game-snake", {
      username: capitalizedUsername,
      highscore: highScore,
    });
  }, 2000);
});

router.get("/game/m/snake/", (req, res, next) => {
  const username = req.session.username;

  if (username === "") {
    res.redirect("/");
    return;
  }

  let highScore = 0;

  db.query(
    "SELECT score_snake FROM users WHERE name = ?",
    req.session.username,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error: ${err}` });
        return;
      }
      highScore = result[0].score_snake;
    }
  );

  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  setTimeout(() => {
    res.render("game-snake-mobile", {
      username: capitalizedUsername,
      highscore: highScore,
    });
  }, 2000);
});

router.post("/game/snake/add/score", (req, res, next) => {
  // Mengambil skor saat ini dari database
  db.query(
    "SELECT score_snake FROM users WHERE name = ?",
    req.session.username,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error: ${err}` });
        return;
      }

      // Mengupdate skor hanya jika skor yang baru lebih besar dari skor saat ini
      const currentScore = result[0].score_snake;
      if (req.body.score > currentScore) {
        db.query(
          "UPDATE users SET score_snake = ? WHERE name = ?",
          [req.body.score, req.session.username],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: `Internal server error: ${err}` });
              return;
            }
            res.redirect("/game/snake");
          }
        );
      } else {
        res.redirect("/game/snake");
      }
    }
  );
});

// Export router
module.exports = router;
