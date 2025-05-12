// Wait for loaded
document.addEventListener('DOMContentLoaded', function () {
    initParallaxEffect();
    initNavigation();
    initQuiz();
    initWaterCalculator();
    initTipsCategories();
});

// Parallax scroll
function initParallaxEffect() {
    window.addEventListener('scroll', function () {
        const parallaxSections = document.querySelectorAll('.parallax-section');

        parallaxSections.forEach(section => {
            const distance = window.scrollY;
            const waterAnimation = section.querySelector('.water-animation'); // faut ajouter l'img lundi la

            if (waterAnimation) {
                // effet de parralax un peut shlag
                waterAnimation.style.transform = `translateY(${distance * 0.05}px)`;
            }
        });
    });
}

// Header active / not
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Quiz
function initQuiz() {
    const quiz = document.getElementById('quiz');
    if (!quiz) return;

    const questions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    const questionIndicator = document.getElementById('question-indicator');
    const quizResults = document.getElementById('quiz-results');
    const correctCount = document.getElementById('correct-count');
    const resultMessage = document.getElementById('result-message');
    const retryBtn = document.getElementById('retry-quiz');

    let currentQuestion = 1;
    const totalQuestions = questions.length;

    // a fix le retry
    updateQuestionIndicator();

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 1) {
            navigateQuestion(currentQuestion - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < totalQuestions) {
            navigateQuestion(currentQuestion + 1);
        }
    });

    submitBtn.addEventListener('click', () => {
        const score = calculateScore();
        displayResults(score);
    });

    // Retry quiz = marche po
    retryBtn.addEventListener('click', () => {
        resetQuiz();
    });

    function navigateQuestion(questionNumber) {
        questions.forEach(question => {
            question.classList.remove('active');
        });

        document.querySelector(`.quiz-question[data-question="${questionNumber}"]`).classList.add('active');
        currentQuestion = questionNumber;

        updateButtonStates();
        updateQuestionIndicator();
    }

    function updateQuestionIndicator() {
        questionIndicator.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
    }

    function updateButtonStates() {
        prevBtn.disabled = currentQuestion === 1;
        nextBtn.disabled = currentQuestion === totalQuestions;
    }

    function calculateScore() {
        let score = 0;
        const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');

        selectedAnswers.forEach(answer => {
            if (answer.getAttribute('data-correct') === 'true') {
                score++;
            }
        });

        return score;
    }

    function displayResults(score) {
        quiz.querySelectorAll('.quiz-question, .quiz-nav, #submit-quiz').forEach(el => {
            el.style.display = 'none';
        });

        quizResults.classList.remove('hidden');
        correctCount.textContent = score;

        if (score === totalQuestions) {
            resultMessage.innerHTML = '<p>Perfect score! You\'re a true Water Warrior!</p>';
        } else if (score >= totalQuestions * 0.7) {
            resultMessage.innerHTML = '<p>Great job! You know a lot about water conservation!</p>';
        } else if (score >= totalQuestions * 0.5) {
            resultMessage.innerHTML = '<p>Good effort! You\'re on your way to becoming a Water Warrior.</p>';
        } else {
            resultMessage.innerHTML = '<p>Keep learning! Check out our Facts page to learn more about water conservation.</p>';
        }
    }

    function resetQuiz() {
        document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
            radio.checked = false;
        });

        quizResults.classList.add('hidden');
        quiz.querySelectorAll('.quiz-nav, #submit-quiz').forEach(el => {
            el.style.display = 'flex';
        });
        submitBtn.style.display = 'block';

        navigateQuestion(1);
    }
}

// Water calculator
function initWaterCalculator() {
    const calculatorForm = document.getElementById('water-calculator');
    if (!calculatorForm) return;

    const calculatorResults = document.getElementById('calculator-results');
    const totalLiters = document.getElementById('total-liters');
    const comparisonFill = document.getElementById('comparison-fill');
    const comparisonText = document.getElementById('comparison-text');
    const personalizedTips = document.getElementById('personalized-tips');
    const recalculateBtn = document.getElementById('recalculate');

    calculatorForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const usage = calculateWaterUsage();
        displayCalculatorResults(usage);
    });

    recalculateBtn.addEventListener('click', function () {
        calculatorResults.classList.add('hidden');
        calculatorForm.style.display = 'grid';
    });

    function calculateWaterUsage() {
        const usage = {
            bathroom: 0,
            kitchen: 0,
            laundry: 0,
            outdoor: 0,
            total: 0
        };

        const showerTime = parseFloat(document.getElementById('shower-time').value);
        const showerFreq = parseFloat(document.getElementById('shower-frequency').value);
        const bathFreq = parseFloat(document.getElementById('bath-frequency').value);
        const toiletFlushes = parseFloat(document.getElementById('toilet-flushes').value);
        const toiletType = document.getElementById('toilet-type').value;
        const faucetMinutes = parseFloat(document.getElementById('faucet-minutes').value);

        const showerDaily = (showerTime * 8 * showerFreq) / 7;

        const bathDaily = (150 * bathFreq) / 7;

        let litersPerFlush = 9;
        if (toiletType === 'low-flow') litersPerFlush = 6;
        if (toiletType === 'ultra-low') litersPerFlush = 4.8;
        const toiletDaily = toiletFlushes * litersPerFlush;

        const faucetDaily = faucetMinutes * 7.5;

        usage.bathroom = showerDaily + bathDaily + toiletDaily + faucetDaily;

        const dishwasherLoads = parseFloat(document.getElementById('dishwasher-loads').value);
        const handWashingDishes = parseFloat(document.getElementById('hand-washing-dishes').value);
        const cooking = parseFloat(document.getElementById('cooking').value);

        const dishwasherDaily = (dishwasherLoads * 23) / 7;

        const handWashingDaily = handWashingDishes * 7.5;

        const cookingDaily = cooking * 3.8;

        usage.kitchen = dishwasherDaily + handWashingDaily + cookingDaily;

        const laundryLoads = parseFloat(document.getElementById('laundry-loads').value);
        const washerType = document.getElementById('washer-type').value;

        let litersPerLoad = 70; // source gpt tkt
        if (washerType === 'efficient') litersPerLoad = 40;
        const laundryDaily = (laundryLoads * litersPerLoad) / 7;

        usage.laundry = laundryDaily;

        const lawnWatering = parseFloat(document.getElementById('lawn-watering').value);
        const carWashing = parseFloat(document.getElementById('car-washing').value);

        const lawnDaily = (lawnWatering * 15) / 7;

        const carDaily = (carWashing * 380) / 30;

        usage.outdoor = lawnDaily + carDaily;

        usage.total = usage.bathroom + usage.kitchen + usage.laundry + usage.outdoor;

        return usage;
    }

    function displayCalculatorResults(usage) {
        calculatorForm.style.display = 'none';
        calculatorResults.classList.remove('hidden');

        totalLiters.textContent = Math.round(usage.total);

        const averageUsage = 150;
        const comparisonPercentage = Math.min((usage.total / averageUsage) * 100, 150);
        comparisonFill.style.width = `${comparisonPercentage}%`;

        if (usage.total < 80) {
            comparisonText.textContent = 'Great job! Your water usage is significantly below average.';
        } else if (usage.total < 120) {
            comparisonText.textContent = 'Good! Your water usage is below average.';
        } else if (usage.total <= 150) {
            comparisonText.textContent = 'Your water usage is about average.';
        } else if (usage.total <= 200) {
            comparisonText.textContent = 'Your water usage is above average. Consider implementing some water-saving tips.';
        } else {
            comparisonText.textContent = 'Your water usage is significantly above average. Check out our tips to reduce your water footprint.';
        }

        generatePersonalizedTips(usage);
    }

    function generatePersonalizedTips(usage) {
        personalizedTips.innerHTML = '';

        const tips = [];

        // Bathroom tips
        if (usage.bathroom > 40) {
            if (document.getElementById('shower-time').value > 5) {
                tips.push('Try reducing your shower time to 5 minutes or less to save approximately 10 liters per shower.');
            }

            if (document.getElementById('toilet-type').value === 'standard') {
                tips.push('Consider installing a low-flow toilet or a toilet displacement device to save up to 1.5 liters per flush.');
            }

            if (document.getElementById('bath-frequency').value > 0) {
                tips.push('Taking showers instead of baths can save up to 20 liters of water per bathing session.');
            }
        }

        // Kitchen tips
        if (usage.kitchen > 15) {
            if (document.getElementById('hand-washing-dishes').value > 10) {
                tips.push('When washing dishes by hand, don\'t let the water run. Fill one basin with wash water and the other with rinse water.');
            }

            if (document.getElementById('dishwasher-loads').value < 7 && document.getElementById('dishwasher-loads').value > 0) {
                tips.push('Make sure dishwasher loads are full before running to maximize water efficiency.');
            }
        }

        // Laundry tips
        if (usage.laundry > 20) {
            if (document.getElementById('washer-type').value === 'standard') {
                tips.push('Consider upgrading to a high-efficiency washing machine to save up to 15 liters per load.');
            }

            tips.push('Always wash full loads of laundry to maximize water efficiency.');
        }

        // Outdoor tips
        if (usage.outdoor > 30) {
            if (document.getElementById('lawn-watering').value > 60) {
                tips.push('Water your lawn and garden in the early morning or evening to reduce evaporation and save up to 30% of your irrigation water.');
                tips.push('Consider installing a drip irrigation system or using a rain barrel to collect rainwater for your garden.');
            }

            if (document.getElementById('car-washing').value > 1) {
                tips.push('Take your car to a commercial car wash that recycles water instead of washing at home, or use a bucket and sponge instead of a running hose.');
            }
        }

        // General tips
        if (tips.length < 3) {
            tips.push('Fix leaky faucets and toilets promptly. A dripping faucet can waste up to 20 liters per day.');
            tips.push('Install aerators on your faucets to reduce water flow without reducing pressure.');
            tips.push('Turn off the water while brushing teeth or shaving to save up to 8 liters per day.');
        }

        tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            personalizedTips.appendChild(li);
        });
    }
}

function initTipsCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons.length === 0) return;

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tips-category').forEach(category => {
                category.classList.remove('active');
            });

            button.classList.add('active');

            const categoryId = `${button.getAttribute('data-category')}-tips`;
            document.getElementById(categoryId).classList.add('active');
        });
    });
}