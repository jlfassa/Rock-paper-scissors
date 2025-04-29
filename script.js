// DOM elements
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const userChoiceDisplayElement = document.getElementById('user-choice-display');
const computerChoiceDisplayElement = document.getElementById('computer-choice-display');
const resultMessageElement = document.getElementById('result-message');
const choiceButtons = document.querySelectorAll('.choice'); // Select all buttons with class 'choice'

// Game variables
let userScore = 0;
let computerScore = 0;

// Icon mapping (using Font Awesome classes)
const choiceIcons = {
    rock: '<i class="fa-regular fa-hand-back-fist"></i>',
    paper: '<i class="fa-regular fa-hand"></i>',
    scissors: '<i class="fa-regular fa-hand-scissors"></i>'
};

// Event listeners for buttons
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get user choice from data-choice attribute
        const userChoice = button.dataset.choice;
        handleGame(userChoice);
    });
});

// Main game logic handler
function handleGame(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    updateScore(result);
    displayChoices(userChoice, computerChoice);
    displayResult(result);
}


// Function to get the random choice of the computer
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(user, computer) {
    if (user === computer) {
        return 'draw'; // Changed to lowercase 'draw'
    }

    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        return 'win'; // Changed to lowercase 'win'
    }

    return 'lose'; // Changed to lowercase 'lose'
}

// Function to update the score variables and display
function updateScore(result) {
     if (result === 'win') {
        userScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    // No score change for draw

    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

// Function to display the chosen icons
function displayChoices(userChoice, computerChoice) {
    // Add class for specific color styling and set icon
    userChoiceDisplayElement.innerHTML = choiceIcons[userChoice];
    userChoiceDisplayElement.className = ''; // Clear previous classes
    userChoiceDisplayElement.classList.add(userChoice); // Add class for color

    computerChoiceDisplayElement.innerHTML = choiceIcons[computerChoice];
    computerChoiceDisplayElement.className = ''; // Clear previous classes
    computerChoiceDisplayElement.classList.add(computerChoice); // Add class for color
}

// Function to display the result message with styling
function displayResult(result) {
    let message = '';
    let messageClass = '';

    switch (result) {
        case 'win':
            message = 'You Win!';
            messageClass = 'win';
            break;
        case 'lose':
            message = 'You Lose!';
            messageClass = 'lose';
            break;
        case 'draw':
            message = 'It\'s a Draw!';
            messageClass = 'draw';
            break;
        default:
            message = 'Let\'s Play!'; // Should not happen in normal flow
            messageClass = 'draw';
    }

    resultMessageElement.textContent = message;

    // Apply result class for styling (win/lose/draw color)
    resultMessageElement.className = 'result-message'; // Reset classes first
    resultMessageElement.classList.add(messageClass);

    // Re-trigger animation (simple way: remove/add class)
    resultMessageElement.style.animation = 'none'; // Remove current animation
    void resultMessageElement.offsetWidth; // Trigger reflow
    resultMessageElement.style.animation = ''; // Re-add animation defined in CSS
}