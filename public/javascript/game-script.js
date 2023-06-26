const leaderboardSnake = document.getElementById("users_snake");
const scoreElements = document.querySelectorAll(".progress");
let highestScoreSnake = 0;

fetch("/db/leaderboard/snake")
  .then((response) => response.json())
  .then((data) => {
    // Process the data returned from the API
    data.forEach((score) => {
      const username = score.name;
      const capitalizedUsername =
        username.charAt(0).toUpperCase() + username.slice(1);

      if (score.score_snake > highestScoreSnake) {
        highestScoreSnake = score.score_snake;
      }

      if (score.score_snake !== 0) {
        const liElement = document.createElement("li");
        const h4Element = document.createElement("h4");
        const pElement = document.createElement("p");

        pElement.setAttribute("class", "progress-snake");
        h4Element.innerText = capitalizedUsername;
        pElement.innerText = score.score_snake;

        liElement.appendChild(h4Element);
        liElement.appendChild(pElement);
        leaderboardSnake.appendChild(liElement);
      }
    });

    setTimeout(() => {
      const scoreElements = document.querySelectorAll(".progress-snake");

      scoreElements.forEach((scoreElement) => {
        const score = parseInt(scoreElement.innerText);
        const percentage = (score / highestScoreSnake) * 100;

        scoreElement.style.width = `${percentage}%`;
      });
    }, 2000);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error(error);
  });

const leaderboardTictactoe = document.getElementById("users_tictactoe");
let highestScoreTictactoe = 0;

fetch("/db/leaderboard/tictactoe")
  .then((response) => response.json())
  .then((data) => {
    // Process the data returned from the API
    data.forEach((score) => {
      const username = score.name;
      const capitalizedUsername =
        username.charAt(0).toUpperCase() + username.slice(1);

      if (score.score_tictactoe > highestScoreTictactoe) {
        highestScoreTictactoe = score.score_tictactoe;
      }

      if (score.score_tictactoe !== 0) {
        const liElement = document.createElement("li");
        const h4Element = document.createElement("h4");
        const pElement = document.createElement("p");

        pElement.setAttribute("class", "progress-tictactoe");
        h4Element.innerText = capitalizedUsername;
        pElement.innerText = score.score_tictactoe;

        liElement.appendChild(h4Element);
        liElement.appendChild(pElement);
        leaderboardTictactoe.appendChild(liElement);
      }
    });

    setTimeout(() => {
      const scoreElements = document.querySelectorAll(".progress-tictactoe");

      scoreElements.forEach((scoreElement) => {
        const score = parseInt(scoreElement.innerText);
        const percentage = (score / highestScoreTictactoe) * 100;

        scoreElement.style.width = `${percentage}%`;
      });

      console.log("Highest Score: " + highestScoreSnake);
    }, 2000);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error(error);
  });

function directToSnakeGame() {
  window.location.href = "/game/snake";
}
