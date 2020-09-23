// This function connects to the Jservice API and saves the question data in a variable called questionData
var question = document.getElementById("question");
var answerButton = document.getElementById("answer");
var clue = document.getElementById("clue");
var highscoreStorage = window.localStorage;
if (highscoreStorage.getItem('highscore') === null){
  highscoreStorage.setItem('highscore', 0);
 } 
 document.getElementById("highscore").textContent = "Highscore: " + highscoreStorage.getItem('highscore');
var answer;
var wrongAnswers = 0;
var score = 0;
var insult;

const loadInsult = () => {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json"
  );
  request.send();
  request.onload = () => {
    if (request.status === 200) {
      const insultData = JSON.parse(request.response);
      insult = insultData.insult;
    } else {
      console.log("ERROR");
    }
  };
};

const loadQuestion = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "http://jservice.io/api/random");
  request.send();
  request.onload = () => {
    if (request.status === 200) {
      const questionData = JSON.parse(request.response);
      question.textContent = questionData[0].question;
      if (questionData[0].question === "") {
        loadQuestion();
      }
      answer = questionData[0].answer;
      clue.textContent = "Clue: " + questionData[0].category.title;
      console.log("Answer: " + answer);
    } else {
      console.log("ERROR");
    }
  };
};

const next = () => {
  loadQuestion();
  document.getElementById("guess").disabled = false;
  document.getElementById("answer").textContent = "";
  document.getElementById("guess").value = "";
  document.getElementById("insult").textContent = "";
};
const next2 = () => {
  loadQuestion();
  document.getElementById("guess").disabled = false;
  document.getElementById("answer").textContent = "";
  document.getElementById("guess").value = "";
  document.getElementById("wrongAnswerModel").style.display = 'none';
  document.getElementById("correctAnswerModel").style.display = 'none';
};

const submit = () => {
  // fix case sensitive and foreign characters
  answer = answer.toLowerCase();
  answer = answer.replace("<i>", "");
  answer = answer.replace("</i>", "");
  guess = document.getElementById("guess").value;

  //Correct answer
  if (guess.toLowerCase() == answer) {
    document.getElementById("correctAnswerModel").style.display = "block";
    document.getElementById("guess").disabled = true;
    score = score + 1;
    document.getElementById("score").textContent =
      "Score: " + score + " Misses: " + wrongAnswers;
  }
  //Wrong answer
  else {
    // insult loaded over question
    document.getElementById("wrongAnswerModel").style.display = "block";
    document.getElementById("insult").textContent = insult;
    // correct answer display
    document.getElementById("answer").textContent =
      "The correct answer is: " + answer;
    document.getElementById("guess").disabled = true;
    wrongAnswers = wrongAnswers + 1;
    document.getElementById("score").textContent =
      "Score: " + score + " Misses: " + wrongAnswers;
    if (wrongAnswers > 3) {
      gameOver();
    }
    loadInsult();
  }
};

const restartPage = () => {
  location.reload();
  return false;
};
const gameOver = () => {
  document.getElementById("gameOverModel").style.display = 'block';
  document.getElementById("modelHighscore").textContent = "Your Score was " + score;
 if(highscoreStorage.getItem('highscore') < score){
   highscoreStorage.setItem('highscore', score);
   document.getElementById("modelHighscoreNote").textContent = "Congratulations! New Highscore!";
}
}

loadInsult();
loadQuestion();
