/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
fdthjfyj
*/

let scores, roundScore, activePlayer , gamePlaying,lastDice,maxScore;
gamePlaying=true;

//-----------------------Functions---------------------------------------------------//

const nextPlayer = () => {
  //Round Score
  roundScore = 0;

  //Next Player
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");

  //Set current scores to 0
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Hide the dice
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
};

const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  // Set scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Reset the names
  document.getElementById("name-" + 0).textContent = "Player 1";
  document.getElementById("name-" + 1).textContent = "Player 2";

  //Players
  document.querySelector(".player-"+0+"-panel").classList.remove("winner")
  document.querySelector(".player-"+1+"-panel").classList.remove("winner")
  document.querySelector(".player-"+0+"-panel").classList.add("active")
  document.querySelector(".player-"+1+"-panel").classList.remove("active")

  //GamePlaying
  gamePlaying=true;
};

//-----------------------Listeners---------------------------------------------------//


//--------------------------------- RESTART -----------------------------------
document.querySelector(".btn-new").addEventListener("click", init);

//--------------------------------- ROLL -----------------------------------
document.querySelector(".btn-roll").addEventListener("click", () => {
  if(!gamePlaying){ alert("Please restart the game!"); return;}

  
  //Read the maximum score
  const winningScore = document.querySelector(".final-score").value;

  //Undefined , 0 , null , ""  are converted to false
  //Anything else is converted to true
  if(!winningScore)
    maxScore = 25;
  else
    maxScore=winningScore
  

  //Pick a random number 0-6
 const dice1 = Math.floor(Math.random() * 6) + 1;
 const  dice2 = Math.floor(Math.random() * 6) + 1;

  //Diplay Result

  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-1").src =  "./src/images/dice-" + dice1 + ".png";

  document.getElementById("dice-2").style.display = "block";
  document.getElementById("dice-2").src =   "./src/images/dice-" + dice2 + ".png";


  // If 6 and 6 looses all the score
  if(dice1 ===6 && dice2 == 6){
    //Player looses score
    scores[activePlayer] = 0;
  
    document.querySelector("#score-" + activePlayer).textContent = roundScore;
    nextPlayer();
  //Update the score if the dice !=1
  }else if (dice1 !== 1 && dice2 !=1) {
    roundScore += dice1;
  } else {
    nextPlayer();
  }

  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  lastDice = dice1;
});

//--------------------------------- HOLD -----------------------------------
document.querySelector(".btn-hold").addEventListener("click", () => {
  if(!gamePlaying){ alert("Please restart the game!"); return;}

  //Add current score to global score
  scores[activePlayer] += roundScore;

  //Update the UI
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
    

  //Check if the player won the game
  if (scores[activePlayer] >= maxScore) {
    document.getElementById("name-" + activePlayer).textContent = "Winner!";
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner")
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active")
    gamePlaying=false;
  } else {
    //Next Player
    nextPlayer();
  }
});

init();
