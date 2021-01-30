let questionBank = [];
let usedBank = [];

function fetchTextbooks() {
  let promise = fetch("questions.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.questions.length; i++) {
        questionBank.push(data.questions[i].Question);
        usedBank.push(null);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  return promise;
}

fetchTextbooks();

function renderStartCard() {
  let cardTemplate = document.querySelector(".starting-card");
  cardTemplate.querySelector(".card-body").style.backgroundColor = "#e9e9e9";
  let cardIndex = Math.floor(Math.random() * Math.floor(questionBank.length));
  if (usedBank[cardIndex] == null) {
    sessionStorage.setItem(
      "last-card",
      cardTemplate.querySelector(".card-title").innerHTML
    );
    console.log(cardTemplate.querySelector(".card-title"));
    cardTemplate.querySelector(".card-title").innerHTML =
      questionBank[cardIndex];
    usedBank[cardIndex] = questionBank[cardIndex];
    let cardBank = document.querySelector(".question-history");
    cardBank.querySelector(".card-text").innerHTML =
      questionBank[cardIndex] +
      "<p></p>" +
      cardBank.querySelector(".card-text").innerHTML;
    sessionStorage.setItem("last-index", cardIndex);
  } else if (usedBank.filter((el) => el === null).length == 0) {
    cardTemplate.querySelector(".card-title").innerHTML =
      "You have answered all of the questions! Restart the game in the Question Bank to play again";
  } else {
    renderStartCard();
  }
  console.log(usedBank);
}

function reset() {
  location.reload();
}

function time() {
  let time = document.querySelector(".form-control").value;
  if (time > 0) {
    setTimeout(timer, time * 1000);
  } else {
    setTimeout(timer, 45 * 1000);
  }
}

function timer() {
  let cardTemplate = document.querySelector(".starting-card");
  cardTemplate.querySelector(".card-title").innerHTML =
    "Time is up! Click for a new card + enable timer again";
  cardTemplate.querySelector(".card-body").style.backgroundColor = "red";
}

function last() {
  let cardTemplate = document.querySelector(".starting-card");

  if (
    cardTemplate.querySelector(".card-title").innerHTML.startsWith("60 seconds")
  ) {
    cardTemplate.querySelector(".card-title").innerHTML =
      questionBank[sessionStorage.getItem("last-index")];
  }

  if (sessionStorage.getItem("last-card") !== null) {
    cardTemplate.querySelector(
      ".card-title"
    ).innerHTML = sessionStorage.getItem("last-card");
  }
  console.log(sessionStorage.getItem("last-card"));
}

