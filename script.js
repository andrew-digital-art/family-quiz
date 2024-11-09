let timerInterval;

function startQuiz() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Ты мама или Лена");
    return;
  }
  document.getElementById("quizContent").style.display = "block";
  startTimer();
}

function startTimer() {
  let timeRemaining = 180; // 3 минуты в секундах
  const timerElement = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `Осталось времени: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function submitQuiz() {
  clearInterval(timerInterval); // Останавливаем таймер
  const username = document.getElementById("username").value;
  const inventionsQuiz = document.getElementById("inventionsQuiz");
  const historyQuiz = document.getElementById("historyQuiz");
  let totalScore = 0;
  let totalQuestions = 0;

  [inventionsQuiz, historyQuiz].forEach(quiz => {
    const answers = quiz.querySelectorAll('input[type="radio"]:checked');
    totalQuestions += quiz.querySelectorAll('.question').length;
    answers.forEach(answer => {
      if (answer.value === 'correct') totalScore++;
    });
  });

  // Отображение результата
  const result = document.getElementById("result");
  result.textContent = `${username}, вы набрали ${totalScore} из ${totalQuestions} правильных ответов!`;
  result.className = totalScore >= totalQuestions / 2 ? 'result correct' : 'result incorrect';

  // Подготовка данных для отправки на почту (вместо сервера тут placeholder)
  sendEmail(username, totalScore, totalQuestions);
}

// Функция для отправки результатов на почту
function sendEmail(username, score, totalQuestions) {
  const mailtoLink = `mailto:andrew.digital.space@gmail.com?subject=Результат квиза&body=${username} набрал ${score} из ${totalQuestions} правильных ответов.`;
  window.location.href = mailtoLink;
}
