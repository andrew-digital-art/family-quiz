const quizData = [
    {
        question: "Какой фрукт упал на голову Исааку Ньютону?",
        options: ["Груша", "Яблоко", "Апельсин", "Банан"],
        answer: "Яблоко"
    },
    {
        question: "Кто изобрёл лампочку?",
        options: ["Никола Тесла", "Томас Эдисон", "Александр Белл", "Бенджамин Франклин"],
        answer: "Томас Эдисон"
    },
    {
        question: "Какая страна подарила США Статую Свободы?",
        options: ["Великобритания", "Италия", "Франция", "Германия"],
        answer: "Франция"
    }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

function loadQuiz() {
    quizContainer.innerHTML = '';
    quizData.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.classList.add('question');
        questionEl.innerText = q.question;
        quizContainer.appendChild(questionEl);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options');

        q.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.classList.add('option');

            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question${index}`;
            optionInput.value = option;

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));
            optionsContainer.appendChild(optionLabel);
        });

        quizContainer.appendChild(optionsContainer);
    });
}

function getResults() {
    let score = 0;
    quizData.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    resultContainer.classList.remove('correct', 'wrong');
    if (score === quizData.length) {
        resultContainer.classList.add('correct');
        resultContainer.innerText = `🎉 Отлично! Все ответы правильные! Ваш результат: ${score} из ${quizData.length}`;
    } else {
        resultContainer.classList.add('wrong');
        resultContainer.innerText = `😬 Ваш результат: ${score} из ${quizData.length}. Попробуйте снова!`;
    }
}

submitButton.addEventListener('click', getResults);

loadQuiz();
