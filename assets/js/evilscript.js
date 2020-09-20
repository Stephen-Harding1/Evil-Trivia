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
      console.log(insultData);
      console.log(insultData.insult);
    } else {
      console.log("ERROR");
    }
  };
};

loadInsult();