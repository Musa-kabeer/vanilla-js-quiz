'use strict';
const quizApp = document.querySelector('.questions_box');
const finalApp = document.querySelector('.final');
const currentQuestionNumber = document.querySelector(
  '.current_question_number'
);
const totalQuestionsNumber = document.querySelector(
  '.total_questions_number'
);
const question = document.querySelector('.question');
const questionOptions = document.querySelector('.question_options');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const option = document.querySelector('.option');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const score = document.querySelector('.score');

const questions = [
  {
    question: 'What is JavaScript?',
    options: [
      'JavaScript is a very powerful client-side scripting language.',
      'Javascript is a popular framework.',
      'JavaScript is also known as laravel.',
      'Javascript is a serverless language',
    ],
    answer: 1,
  },

  {
    question: 'What are JavaScript Data Types?',
    options: [
      'False, String, Boolean, Object, Primitive.',
      'Number, String, Boolean, Object, Primitive.',
      'Number, String, Boolean, Object, Undefined.',
      'Number, Data, Boolean, Object, Undefined.',
    ],
    answer: 3,
  },

  {
    question:
      'isNan function returns true if the argument is not a number; otherwise, it is false.',
    options: ['No', 'Maybe', 'Yes', "I don't know"],
    answer: 3,
  },

  {
    question:
      'What are the to syntax for converting strings to number in javascript?',
    options: [
      '"+" sign or "Number" function',
      '"-" sign or "parseInt" function',
      '"+" sign or "parseInt" function',
      'No of the above',
    ],
    answer: 1,
  },

  {
    question: 'What is the computer system?',
    options: [
      'A computer system devices that is used for chatting',
      'A computer system is a combination of memory, CPU, peripheral devices that are connected to it, and OS',
      'Not sure',
      'No of the above',
    ],
    answer: 2,
  },

  {
    question: 'Some popular operating system are:',
    options: [
      'Python, OSX, and Linux.',
      'Microsoft Windows, OSX, and c++',
      'Microsoft Windows, OSX, and Linux.',
      'Microsoft Windows, javascript and Linux.',
    ],
    answer: 3,
  },

  {
    question: 'What Is A Super-class?',
    options: [
      'Good class',
      'Classes that contains constructor',
      'Classes that can be inherit from',
      'The object of the rest of the class has all the characteristics related to the superclass',
    ],
    answer: 4,
  },
];

let currentQuestion = 0;
let totalScore = 0;
let timer;
quizApp.classList.add('hidden');

const startLogoutTimer = function () {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    document.querySelector('.timer').textContent = `${min}:${sec}`;

    if (time === 0) {
      quizApp.classList.add('hidden');
      finalApp.classList.remove('hidden');
      currentQuestion = 0;
      score.textContent = totalScore;

      clearInterval(timer);
    }

    time--;
  };

  let time = 120;

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

function updateDOM() {
  currentQuestionNumber.textContent = currentQuestion + 1;
  totalQuestionsNumber.textContent = questions.length;

  // UPDATING THE DISPLAY QUESTION
  question.textContent = questions[currentQuestion].question;

  // CLEAR THE DOM CONTENT BEFORE RENDERING NEW OPTIONS
  questionOptions.innerHTML = '';

  // RENDERING EACH OPTIONS
  questions[currentQuestion].options.forEach((option, i) => {
    const html = `
     <div class="option" id="${i + 1}" >${option}</div>
   `;

    questionOptions.insertAdjacentHTML('beforeend', html);
  });
}

// DISPLAY THE QUESTIONS
startBtn.addEventListener('click', () => {
  if (timer) clearInterval(timer);

  timer = startLogoutTimer();

  quizApp.classList.remove('hidden');
  startBtn.classList.add('hidden');
  totalScore = 0;

  currentQuestionNumber.textContent = currentQuestion + 1;
  totalQuestionsNumber.textContent = questions.length;

  // UPDATING THE DISPLAY QUESTION
  question.textContent = questions[currentQuestion].question;

  // RENDERING EACH OPTIONS
  questions[currentQuestion].options.forEach((option, i) => {
    const html = `
     <div class="option " id="${i + 1}" >${option}</div>
   `;

    questionOptions.insertAdjacentHTML('beforeend', html);
  });
});

// RESET BUTTON
resetBtn.addEventListener('click', () => {
  startBtn.classList.remove('hidden');
  finalApp.classList.add('hidden');

  questionOptions.innerHTML = '';
});

// ON CHOOSING ANSWER
questionOptions.addEventListener('click', (e) => {
  const target = e.target;

  if (!target.classList.contains('option')) return;

  const question =
    target.parentElement.parentElement.firstElementChild.textContent;

  target.classList.add('option');

  const answerChosen = target.id;

  const getData = questions.find(
    (quest) => quest.question === question
  );

  if (currentQuestion + 1 === questions.length) {
    quizApp.classList.add('hidden');
    finalApp.classList.remove('hidden');
    currentQuestion = 0;

    questionOptions.innerHTML = '';

    updateDOM();

    return (score.textContent = totalScore);
  }

  if (+answerChosen === getData.answer) {
    if (currentQuestion + 1 < questions.length) {
      target.classList.add('correct');
      totalScore += 10;

      currentQuestion++;

      setTimeout(() => {
        updateDOM();
      }, 1000);
    }
  }

  if (+answerChosen !== getData.answer) {
    target.classList.add('incorrect');
    currentQuestion++;

    setTimeout(() => {
      updateDOM();
    }, 1000);
  }
});
