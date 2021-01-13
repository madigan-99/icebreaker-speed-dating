let questionBank = [];
let usedBank = [];

function fetchTextbooks() {
  let promise = fetch("questions.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        questionBank.push(data[i].Question);
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
      "You have answered all of the questions!";
  } else {
    renderStartCard();
  }
  console.log(usedBank);
}

function reset() {
  location.reload();
}

function timer() {
  let cardTemplate = document.querySelector(".starting-card");
  cardTemplate.querySelector(".card-title").innerHTML =
    "60 seconds is up! Click for a new card + enable timer again";
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
  }
  console.log(sessionStorage.getItem("last-card"));
}