let userScore=0;
let computerScore=0;
let round=1;

const choices=["rock", "paper","scissors"];

const countdownEl = document.getElementById("countdown");
const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const roundResult = document.getElementById("roundResult");
const roundDisplay = document.getElementById("roundDisplay");
const userChoiceText = document.getElementById("userChoice");
const computerChoiceText = document.getElementById("computerChoice");
const buttonsDiv=document.querySelector(".buttons");
const userEmoji=document.getElementById("userEmoji");
const computerEmoji=document.getElementById("computerEmoji");
const nextRoundBtn=document.getElementById("nextRoundBtn");

const buttons=document.querySelectorAll(".btn");

function getComputerChoice(){
    const randomIndex=Math.floor(Math.random()*3);
    return choices[randomIndex];
}

const emojiMap={
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

buttons.forEach(button=>{
    button.addEventListener("click",() =>{
        const userChoice=button.classList[1];
        startCountdown(userChoice);
    });
});

function startCountdown(userChoice){
    let count=3;
    countdownEl.textContent=count;
    buttonsDiv.classList.add("hidden");
    userEmoji.textContent="";
    computerEmoji.textContent="";

    let dots = 0;
    const thinkingInterval = setInterval(() => {
        dots = (dots % 3) + 1;
        computerEmoji.textContent = ".".repeat(dots);
    }, 300);

    const interval=setInterval(() =>{
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            clearInterval(interval);
            clearInterval(thinkingInterval);
            countdownEl.textContent = "";
            playRound(userChoice);
        }
    },1000);
}

function playRound(userChoice){
    const computerChoice=getComputerChoice();
    userChoiceText.textContent = "You chose: " + userChoice;
    computerChoiceText.textContent = "Computer chose: " + computerChoice;
    userEmoji.textContent=emojiMap[userChoice];
    computerEmoji.textContent=emojiMap[computerChoice];
    let result="";

    if(userChoice===computerChoice){
        result="Draw";
    }else if(
        (userChoice==="rock" && computerChoice === "scissors")||
        (userChoice==="scissors" && computerChoice === "paper")||
        (userChoice==="paper" && computerChoice === "rock")
    ){
        result="You Win!";
        userScore++;
        round++;
    }else{
        result="Computer Wins!";
        computerScore++;
        round++;
    }

    roundResult.textContent=result;
    updateUI();
    nextRoundBtn.classList.remove("hidden");
}

nextRoundBtn.addEventListener("click", () => {
    nextRoundBtn.classList.add("hidden");
    userEmoji.textContent = "";
    computerEmoji.textContent = "";
    userChoiceText.textContent = "";
    computerChoiceText.textContent = "";
    roundResult.textContent = "";
    buttonsDiv.classList.remove("hidden");
});

function updateUI() {
    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;

    roundDisplay.textContent = "Round: " + round;
}


