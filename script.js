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

const buttons=document.querySelectorAll(".btn");

function getComputerChoice(){
    const randomIndex=Math.floor(Math.random()*3);
    return choices[randomIndex];
}

buttons.forEach(button=>{
    button.addEventListener("click",() =>{
        const userChoice=button.classList[1];
        startCountdown(userChoice);
    });
});

function startCountdown(userChoice){
    let count=3;
    countdownEl.textContent=count;
    buttons.forEach(button => button.disabled=true);
    const interval=setInterval(() =>{
        count--;
        countdownEl.textContent=count;
        if (count > 0) {
            countdownEl.textContent = count;
        } else {
            clearInterval(interval);
            countdownEl.textContent = "";

            playRound(userChoice);

            buttons.forEach(button => button.disabled = false);
        }
    },1000);
}

function playRound(userChoice){
    const computerChoice=getComputerChoice();
    userChoiceText.textContent = "You chose: " + userChoice;
    computerChoiceText.textContent = "Computer chose: " + computerChoice;

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
    }else{
        result="Computer Wins!";
        computerScore++;
    }

    roundResult.textContent=result;
    console.log("Result element:", roundResult);
    updateUI();
}

function updateUI() {
    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;

    roundDisplay.textContent = "Round: " + round;
    round++;
}

