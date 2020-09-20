const loadQuestion = () => {
    let request = new XMLHttpRequest();
    request.open("GET", "http://jservice.io/api/random");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            const questionData = (JSON.parse(request.response));
            console.log(questionData[0].question)
        }
        else {
            console.log("ERROR");
        }
    }
}
loadQuestion();