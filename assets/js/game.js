const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "La digestion commence dans l'intestin grêle.",
    choice1: "Vrai  ",
    choice2: "Faux ",
    answer: 2,
  },
  {
    question:
      "L'amylase est une enzyme qui permet la catalyse de la dégradation des protéines en acides aminés.",
    choice1: "Vrai  ",
    choice2: "Faux ",
    answer: 2,
  },
  {
    question: " Les lipides ne subissent pas la digestion.",
    choice1: "Vrai  ",
    choice2: "Faux ",
    answer: 2,
  },
  {
    question:
      "Dans le tube digestif, les aliments sont progressivement transformes en nutriments ",
    choice1: "Vrai  ",
    choice2: "Faux ",
    answer: 1,
  },
  {
    question:
      " La digestion des aliments dans le corps humain commence dans la bouche.  ",
    choice1: "Vrai  ",
    choice2: "Faux ",
    answer: 1,
  },
  {
    question:
      " Les aliments ne passent pas dans les glandes digestives annexes ",
    choice1: "Vrai  ",
    choice2: "Faux ",
    answer: 1,
  },
  {
    question:
      " Les organes du tube digestif traversés par les aliments sont, dans l'ordre ",
    choice1:
      "la bouche – l’œsophage – l’intestin grêle – le gros intestin – l’estomac ; ",
    choice2:
      " la bouche – l’estomac – l’intestin grêle – le gros intestin – l’œsophage ; ",
    choice3:
      " la bouche – l’œsophage – l’estomac – l’intestin grêle – le gros intestin.",
    answer: 3,
  },
  {
    question:
      " La transformation des aliments en nutriments se fait grâce à : ",
    choice1: " une action des enzymes digestives et à une action mécanique ;",
    choice2: " une action de levures digestives ; ",
    choice3: "une action mécanique. ",

    answer: 1,
  },
  {
    question: "La pepsine est une enzyme qui appartient au :  ",
    choice1: "suc gastrique ;  ",
    choice2: "suc intestinal ; ",
    choice3: "suc pancréatique. ",

    answer: 1,
  },
  {
    question: " Les nutriments sont constitués : ",
    choice1:
      "de sels minéraux, de vitamines, d’eau, d’acides aminés, d’amidon, de glycérol et d’acides gras ;  ",
    choice2:
      "de sels minéraux, de vitamines, d’eau, de polypeptides, de glucose, de glycérol et d’acides gras. ",
    choice3:
      " de sels minéraux, de vitamines, d’eau, d’acides aminés, de glucose, de glycérol et d’acides gras. ",

    answer: 3,
  },
  {
    question: " L’absorption intestinale est le passage : ",
    choice1: "des aliments du tube digestif dans le sang ;  ",
    choice2: " des aliments du tube digestif dans les organes ; ",
    choice3: "des nutriments du tube digestif dans le sang. ",

    answer: 3,
  },
];

//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 12;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = (num) => {
  score -= num;
  scoreText.innerText = score;
};

startGame();
