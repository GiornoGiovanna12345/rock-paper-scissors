let userScore = 0;
let computerScore = 0;
let round = 1;
let maxWins=2;

const choices = ["rock", "paper", "scissors"];

const countdownEl = document.getElementById("countdown");
const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const roundResult = document.getElementById("roundResult");
const roundDisplay = document.getElementById("roundDisplay");
const userChoiceText = document.getElementById("userChoice");
const computerChoiceText = document.getElementById("computerChoice");
const buttonsDiv = document.querySelector(".buttons");
const userEmoji = document.getElementById("userEmoji");
const computerEmoji = document.getElementById("computerEmoji");
const nextRoundBtn = document.getElementById("nextRoundBtn");

const buttons = document.querySelectorAll(".btn");

const emojiMap = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const userChoice = button.classList[1];
        startCountdown(userChoice);
    });
});

function startCountdown(userChoice) {
    buttonsDiv.classList.add("hidden");
    userEmoji.textContent = "";
    computerEmoji.textContent = "";

    let dots = 0;
    const thinkingInterval = setInterval(() => {
        dots = (dots % 3) + 1;
        computerEmoji.textContent = ".".repeat(dots);
    }, 300);

    setTimeout(() => {
        clearInterval(thinkingInterval);
        playRound(userChoice);
    }, 2400)
}

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    userChoiceText.textContent = "You chose: " + userChoice;
    computerChoiceText.textContent = "Computer chose: " + computerChoice;
    userEmoji.textContent = emojiMap[userChoice];
    computerEmoji.textContent = emojiMap[computerChoice];

    let result = "";

    if (userChoice === computerChoice) {
        result = "DRAW";
        roundResult.style.color = "#968989";
        roundResult.style.textShadow = "0 0 15px #968989";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock"))
        {
        result = "YOU WIN!";
        roundResult.style.color = "#2d8d5e";
        roundResult.style.textShadow = "0 0 15px #2d8d5e, 0 0 30px #2d8d5e";
        userScore++;
    } else {
        result = "COMPUTER WINS!";
        roundResult.style.color = "#c0392b";
        roundResult.style.textShadow = "0 0 15px #c0392b, 0 0 30px #c0392b";
        computerScore++;
    }

    roundResult.textContent = result;
    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;

    if(userScore === maxWins || computerScore === maxWins){
        endGame();
    }else{
        nextRoundBtn.textContent = (result === "DRAW") ? "Play Again" : "Next Round";
        nextRoundBtn.classList.remove("hidden");
    }

}

nextRoundBtn.addEventListener("click", () => {
    if (nextRoundBtn.textContent === "Next Round") {
        round++;
    }
    nextRoundBtn.classList.add("hidden");
    userEmoji.textContent = "";
    computerEmoji.textContent = "?";
    userChoiceText.textContent = "";
    computerChoiceText.textContent = "";
    roundResult.textContent = "";
    buttonsDiv.classList.remove("hidden");
    roundDisplay.textContent = "Round: " + round;
});

function endGame(){
    const finalResult=document.getElementById("finalResult");
    const winnerText=document.getElementById("winnerText");
    winnerText.textContent=userScore === maxWins ? "You win the Game! 🎉":"Computer Wins the Game! 💀";
    finalResult.style.display="flex";
    buttonsDiv.classList.add("hidden");
    document.getElementById("bestOfFiveBtn").style.display=maxWins === 3 ?"none":"inline-block";
}

document.getElementById("replayBtn").addEventListener("click", () => resetGame(2));
document.getElementById("bestOfFiveBtn").addEventListener("click", () => {
    maxWins = 3;
    document.getElementById("finalResult").style.display = "none";
    buttonsDiv.classList.remove("hidden");
    roundResult.textContent = "";
    userEmoji.textContent = "";
    computerEmoji.textContent = "🤖";
    userChoiceText.textContent = "";
    computerChoiceText.textContent = "";
});

function resetGame(newMaxWins) {
    maxWins = newMaxWins;
    userScore = 0;
    computerScore = 0;
    round = 1;
    userScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    roundDisplay.textContent = "Round: 1";
    roundResult.textContent = "";
    userChoiceText.textContent = "";
    computerChoiceText.textContent = "";
    userEmoji.textContent = "";
    computerEmoji.textContent = "?";
    document.getElementById("finalResult").style.display = "none";
    buttonsDiv.classList.remove("hidden");
}

document.getElementById("startBtn").addEventListener("click", () => {
    const intro = document.getElementById("introScreen");
    intro.style.opacity = "0";
    setTimeout(() => {
        intro.style.display = "none";
    }, 500);
});
