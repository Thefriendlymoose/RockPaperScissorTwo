const rock = 1;
const paper = 2;
const scissor = 3;


const userWeapons = document.querySelectorAll(".weapon-1");
const modeButtons = document.querySelectorAll("button");
const userScoreDOM = document.getElementById("user-score");
const compScoreDOM = document.getElementById("comp-score");
const roundDOM = document.getElementById("round-counter");


let currentRound = 0;
let userScore = 0;
let compScore = 0;


modeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        startGame(parseInt(e.target.value));
    })
})


function computerPlay(){
    const rockPaperScissor = [1, 2, 3];
    const randomPlay = rockPaperScissor[Math.floor(Math.random() * rockPaperScissor.length)];
    
    return randomPlay;
}

function updateRoundStatus(){
    userScoreDOM.textContent = userScore;
    compScoreDOM.textContent = compScore;
    roundDOM.textContent = currentRound;
}


function gameInit(mode){
    modeButtons.forEach(button => {
        if(parseInt(button.value) === mode){
            button.classList.add("round-button-selected");
            button.disabled = true;
        }
    })
    modeButtons.forEach(button => {
        if(parseInt(button.value) !== mode){
            button.classList.add("round-button-not-selected");
            button.disabled = true;
        }
    })

}

function gameEndReset(){
    currentRound = 0;
    userScore = 0;
    compScore = 0;
    modeButtons.forEach(button => {
        button.classList.remove("round-button-selected");
        button.classList.remove("round-button-not-selected");
        button.disabled = false;
    });
}


function startGame(mode){
    gameInit(mode);
    playGame(mode);
    

}



async function playGame(mode){
    let haveWinner = false;
    
    while(!haveWinner){
        currentRound += 1;
        let myPromise = new Promise((resolve, reject) => {
            userWeapons.forEach(weapon => {
                weapon.addEventListener("mousedown", (e) => {
                    if(e.currentTarget.id.toUpperCase() === "ROCK"){
                        resolve(1);
                    } else if(e.currentTarget.id.toUpperCase() === "PAPER"){
                        resolve(2);
                    } else if(e.currentTarget.id.toUpperCase() === "SCISSOR"){
                        resolve(3);
                    }
                    
                })
            })
        });
        await myPromise.then(userAction => {
            checkRoundWinner(userAction, computerPlay());
        })

        updateRoundStatus()
        if(userScore === mode || compScore === mode){
            haveWinner = true;
        }
    }
    gameEndReset();
    updateRoundStatus();

}

function checkRoundWinner(userInput, compInput){


    switch(true){
        case compInput === userInput:
            
        break
        case compInput === 3 && userInput === 2:
            userScore += 1;
        break
        case compInput === 3 && userInput === 1:
            compScore += 1;
        break
        case compInput === 2 && userInput === 1:
            userScore += 1;
        break
        case compInput === 2 && userInput === 3:
            compScore += 1;
        break
        case compInput === 1 && userInput === 3:
            userScore += 1;
        break
        case compInput === 1 && userInput === 2:
            compScore += 1;
        break
        
        default:
            return "Incorrect input"
        break
    }

}

