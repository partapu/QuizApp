"use strict";
const startbtn = document.querySelector(".Startbtn");
const questionContainer = document.querySelector(".questionContainer");
const question = document.querySelector(".Question");
const startContainer = document.querySelector(".startContainer");
let nextbtn = document.querySelector(".Next");
const body = document.querySelector("body");

//Question class
class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}
const questions = [];
const question1 = new Question(
  "Value of Number(null)",
  ["NAN", "null", "TypeError", "0"],
  "0"
);
const question2 = new Question(
  'Value of Number(" 11 ")',
  ["NAN", "11", "TypeError", "0"],
  "11"
);
const question3 = new Question(
  "Which type of JavaScript language is ___",
  ["Object-Oriented  ", "Object-Based", "Assembly-language", "High-level"],
  "Object-Based"
);
const question4 = new Question(
  "Inside which HTML element do we put the JavaScript?",
  ["scripting tag", "js tag", "script tag", "None of the Above"],
  "script tag"
);
const question5 = new Question(
  "Where is the correct place to insert a JavaScript?",
  ["head Section", "Both head&body", "body section", "title section"],
  "Both head&body"
);
const question6 = new Question(
  'How do you write "Hello World" in an alert box? ',
  [
    "alertBox(Hello World) ",
    "alert(Hello World)",
    "msg(Hello World)",
    "msgBox(Hello World)",
  ],
  "alert(Hello World)"
);
const question7 = new Question(
  "How do you create a function in JavaScript?",
  [
    "function=my()",
    "function::my()",
    "function myfunction()",
    "None of the Above",
  ],
  "function myfunction()"
);

questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);
questions.push(question6);
questions.push(question7);
let currentQuestion = 0;
let totalQuestion = questions.length;
let correct = 0;

//Generate html markup for question
const generateMarkUp = function (obj) {
  const html = `
    <p class="question-text">${obj.question}</p>
    <div class="options-container">
      <div class="option-item">
        <input
          class="option-1 options"
          id="option1"
          type="radio"
          name="option"
        /><label for="option1" class="option-text"> &nbsp ${obj.options[0]}</label>
      </div>
      <div class="option-item">
        <input
          class="option-2 options"
          id="option2"
          type="radio"
          name="option"
        /><label for="option2" class="option-text"> &nbsp ${obj.options[1]}</label>
      </div>
      <div class="option-item">
        <input
          class="option-3 options"
          id="option3"
          type="radio"
          name="option"
        /><label for="option3" class="option-text"> &nbsp ${obj.options[2]}</label>
      </div>
      <div class="option-item">
        <input
          class="option-4 options"
          id="option4"
          type="radio"
          name="option"
        /><label for="option4" class="option-text"> &nbsp ${obj.options[3]}</label>
      </div>
    </div>
`;
  question.textContent = "";
  question.insertAdjacentHTML("afterbegin", html);
  currentQuestion++;
  nextbtn = document.querySelector(".Next");
};

//start button event listner
startbtn.addEventListener("click", function (e) {
  startContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  body.classList.remove("bg-2");
  body.classList.remove("bg-1");
  body.classList.add("bg-3");
});

const timeOut = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

//next button event listner
nextbtn.addEventListener("click", function (e) {
  body.classList.remove("bg-2");
  body.classList.remove("bg-1");
  body.classList.add("bg-3");
  if (currentQuestion === totalQuestion) {
    const html = `<div class="Question">
    <h1 class="Start">All questions are answered🎉</h1>
    </div>`;
    questionContainer.textContent = "";
    questionContainer.insertAdjacentHTML("afterbegin", html);
    const html2 = `<div class="results hidden"> <h1>
    ${correct}/${totalQuestion} Correct</h1>
     </div>`;
    body.insertAdjacentHTML("beforeend", html2);
    renderResults();
    return;
  }
  generateMarkUp(questions[currentQuestion]);

  // Validate Answer
  const options = Array.from(document.querySelectorAll(".options"));
  for (let radio in options) {
    options[radio].onclick = function () {
      var selector = "label[for=" + this.id + "]";
      var label = document.querySelector(selector);
      var text = label.textContent.trim();
      console.log(questions[currentQuestion - 1].answer);
      if (text === questions[currentQuestion - 1].answer) {
        correct++;
        body.classList.remove("bg-2");
        body.classList.remove("bg-3");
        body.classList.add("bg-1");
      } else {
        body.classList.remove("bg-1");
        body.classList.remove("bg-3");
        body.classList.add("bg-2");
      }
    };
  }
});
