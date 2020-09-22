// This function connects to the Jservice API and saves the question data in a variable called questionData
var question = document.getElementById("question");
var answerButton = document.getElementById("answer");
var clue = document.getElementById("clue");
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
      console.log(insultData.insult);
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
      clue.textContent = "Category: " + questionData[0].category.title;
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
  clue.textContent = "Clue: " + questionData[0].category.title;
};

const submit = () => {
  //Correct answer
  if (document.getElementById("guess").value == answer) {
    document.getElementById("guess").disabled = true;
    score = score + 1;
    document.getElementById("score").textContent =
      "Score: " + score + " Misses: " + wrongAnswers;
  }
  //Wrong answer
  else {
    // insult loaded over question
    loadInsult();
    document.getElementById("insult").textContent = insult;
    // correct answer display
    document.getElementById("answer").textContent =
      "The correct answer is: " + answer;
    document.getElementById("guess").disabled = true;
    wrongAnswers = wrongAnswers + 1;
    document.getElementById("score").textContent =
      "Score: " + score + " Misses: " + wrongAnswers;
  }
};

const restartPage = () => {
  location.reload();
  return false;
};

loadInsult();
loadQuestion();
