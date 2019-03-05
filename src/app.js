/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
fdthjfyj
*/

let scores, roundScore, activePlayer, dice;

//Add Event Listener for Hold Button
document.querySelector(".btn-new").addEventListener("click", () => {
  initGame();
});

//Add Event Listener for Roll Button
document.querySelector(".btn-roll").addEventListener("click", () => {
  //Pick a random number 0-6
  dice = Math.floor(Math.random() * 6) + 1;

  //Diplay Result
  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "block";
  diceDom.src = "./src/images/dice-" + dice + ".png";

  //Update the score if the dice !=1
  if (dice !== 1) {
    roundScore += dice;
  } else {
    nextPlayer();
  }

  document.querySelector("#current-" + activePlayer).textContent = roundScore;
});

//Add Event Listener for Hold Button
document.querySelector(".btn-hold").addEventListener("click", () => {
  //Add current score to global score
  scores[activePlayer] += roundScore;

  //Update the UI
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  //Check if the player won the game
  if (scores[activePlayer] >= 10) {
    document.getElementById("name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner")
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active")
  } else {
    //Next Player
    nextPlayer();
  }
});

const nextPlayer = () => {
  //Round Score
  roundScore = 0;

  //Next Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Toggle
  document.querySelector(".player-" + 0 + "-panel").classList.toggle("active");
  document.querySelector(".player-" + 1 + "-panel").classList.toggle("active");

  //Set current scores to 0
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Hide the dice
  document.querySelector(".dice").style.display = "none";
};

const initGame = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  // Set scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Hide the dice
  document.querySelector(".dice").style.display = "none";

  //Players
  document.querySelector(".player-" + 0 + "-panel").classList.add("active");
  document.querySelector(".player-" + 1 + "-panel").classList.remove("active");
};

initGame();
