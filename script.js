let timerInterval;

window.onload = startTimer; // Запуск таймера при загрузке страницы

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

  const result = document.getElementById("result");
  result.textContent = `Вы набрали ${totalScore} из ${totalQuestions} правильных ответов!`;
  result.className = totalScore >= totalQuestions / 2 ? 'result correct' : 'result incorrect';

  sendEmail(totalScore, totalQuestions);
}

function sendEmail(score, totalQuestions) {
  const mailtoLink = `mailto:andrew.digital.space@gmail.com?subject=Результат квиза&body=Пользователь набрал ${score} из ${totalQuestions} правильных ответов.`;
  window.location.href = mailtoLink;
}
