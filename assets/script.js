const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const timeEl = document.getElementById("time");
const box = document.getElementById("box");
const action = document.querySelector(".action-btn");
const resultEl = document.getElementById("result");
const highScoreEl = document.getElementById("leaderboard");
let timer = 50;
let questionIndex = 0;
let score = 0;

highScoreEl.addEventListener("click", () => {
  box.innerHTML = highScoresHtml();
  document.getElementById("clearHighScore").addEventListener("click", () => {
    localStorage.removeItem("scores");
    alert("HighScores Cleared!! Play quiz to make new high scores😁😁");
    location.href = "/";
  });
  document.getElementById("goBack").addEventListener("click", () => {
    location.href = "/";
  });
});

action.addEventListener("click", () => {
  const interval = setInterval(() => {
    timeEl.innerText = `Time: ${timer}`;
    timer--;
    if (timer < 0) {
      timer = 50;
      clearInterval(interval);
      box.innerHTML = allDoneHtml(score);
      const inputEl = document.getElementById("initials");
      const submitButton = document.getElementById("submitQuiz");

      inputEl.addEventListener("keyup", (e) => {
        inputEl.value = e.target.value.toUpperCase();
      });

      submitButton.addEventListener("click", () => {
        const key = inputEl.value;
        if (key === "") {
          alert("Please enter Initials first");
        } else {
          const highScores = JSON.parse(localStorage.getItem("scores") || "{}");
          const prevHighScore = highScores[key];
          if (!prevHighScore || prevHighScore < score) {
            highScores[key] = score;
            localStorage.setItem("scores", JSON.stringify(highScores));
          }
        }
        inputEl.value = "";
        location.href = "/";
      });
    }
  }, 1000);
  render();
});

function render() {
  box.innerHTML = questionHtml(questionIndex);
  const options = document.querySelectorAll(".option");
  options.forEach((optionEl) => {
    optionEl.addEventListener("click", (e) => {
      if (e.target.innerText === questions[questionIndex].answer) {
        resultEl.innerText = "Correct!";
        score += 10;
      } else {
        resultEl.innerText = "Incorrect!";
        timer -= 10;
      }
      questionIndex++;
      if (questionIndex === questions.length) {
        box.innerHTML = allDoneHtml(score);
        const inputEl = document.getElementById("initials");
        const submitButton = document.getElementById("submitQuiz");

        inputEl.addEventListener("keyup", (e) => {
          inputEl.value = e.target.value.toUpperCase();
        });

        submitButton.addEventListener("click", () => {
          const key = inputEl.value;
          if (key === "") {
            alert("Please enter Initials first");
          } else {
            const highScores = JSON.parse(
              localStorage.getItem("scores") || "{}"
            );
            const prevHighScore = highScores[key];
            if (!prevHighScore || prevHighScore < score) {
              highScores[key] = score;
              localStorage.setItem("scores", JSON.stringify(highScores));
            }
          }
          inputEl.value = "";
          location.href = "/";
        });
      } else {
        render();
      }
    });
  });
}

function questionHtml(questionIndex) {
  let question = questions[questionIndex];
  let html = `<h2 class="title">${question.questionText}</h2>`;
  question.options.forEach((option) => {
    html += `<div class="option">${option}</div>`;
  });
  return html;
}

function allDoneHtml(score) {
  let html = `<h2 class="title">All Done!</h2>`;
  html += `<p class="description">Your final score is ${score}.</p>`;
  html += `<div class="row"><label for="initials">Enter Initials: </label>
    <input type="text" name="initials" id="initials" />
    <button id="submitQuiz" class="action-btn">Submit</button></div>`;
  return html;
}

function highScoresHtml() {
  let html = `<h2 class="title">Highscores</h2><ol style="margin-left: 3rem;">`;
  const highScores = JSON.parse(localStorage.getItem("scores"));
  for (const key in highScores) {
    html += `<li>${key} - ${highScores[key]}</li>`;
  }
  html += "</ol>";
  html += `<div style="margin-top: 1rem;"><button id="goBack" class="action-btn">Go Back</button>
    <button id="clearHighScore" class="action-btn">Clear Highscores</button></div>`;
  return html;
}
