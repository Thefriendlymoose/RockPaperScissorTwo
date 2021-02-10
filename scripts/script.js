const rock = 1;
const paper = 2;
const scissor = 3;

const gameEndContainer = document.getElementById("intro-container");
const userWeapons = document.querySelectorAll(".weapon-1");
const modeButtons = document.querySelectorAll("button");
const userScoreDOM = document.getElementById("user-score");
const compScoreDOM = document.getElementById("comp-score");
const roundDOM = document.getElementById("round-counter");
const userHistory = document.getElementById("user-icon-container");
const roundContainer = document.getElementById("round-count-container");
const compHistory = document.getElementById("comp-icon-container");
const hiddenWeaponIcons = document.querySelectorAll(".hide");


let currentRound = 0;
let userScore = 0;
let compScore = 0;

modeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        gameEndReset();
        updateRoundStatus();
        resetGameHistory();
        updateBanner();
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

function gameEndBanner(winner){
    let gameBanner = document.querySelector(".game-end-banner");
    gameBanner.textContent = `${winner} won the game, please chose mode below to start a new game!`;
}

function updateBanner(){
    let gameBanner = document.querySelector(".game-end-banner");
    gameBanner.textContent = `You started a new game`
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

function resetButtons(){
    modeButtons.forEach(button => {
        button.classList.remove("round-button-selected");
        button.classList.remove("round-button-not-selected");
        button.disabled = false;
    });
}

function gameEndReset(){
    currentRound = 0;
    userScore = 0;
    compScore = 0;
}

function resetGameHistory(){
    while(userHistory.firstChild){
        userHistory.removeChild(userHistory.lastChild);
    }
    while(compHistory.firstChild){
        compHistory.removeChild(compHistory.lastChild);
    }
    while(roundContainer.firstChild){
        roundContainer.removeChild(roundContainer.lastChild);
    }
}

async function startGame(mode){
    gameInit(mode);
    await playGame(mode);
    resetButtons();

}



async function playGame(mode){
    let haveWinner = false;
    let winner = "";

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
            if(userScore>compScore){
                winner = "You";
            } else{
                winner = "Computer";
            }
        }
    }
    
    gameEndBanner(winner);
}

function checkRoundWinner(userInput, compInput){
    let roundWinner = "";

    switch(true){
        case compInput === userInput:
            
        break
        case compInput === 3 && userInput === 2:
            compScore += 1;
            roundWinner = "computer";
        break
        case compInput === 3 && userInput === 1:
            userScore += 1;
            roundWinner = "user";
        break
        case compInput === 2 && userInput === 1:
            compScore += 1;
            roundWinner = "computer";
        break
        case compInput === 2 && userInput === 3:
            userScore += 1;
            roundWinner = "user";
        break
        case compInput === 1 && userInput === 3:
            compScore += 1;
            roundWinner = "computer";
        break
        case compInput === 1 && userInput === 2:
            userScore += 1;
            roundWinner = "user";
        break
        
        default:
            return "Incorrect input"
        break
    }

    updateHistory(userInput, compInput, roundWinner);

}

function updateHistory(userAction, compAction, roundWinner){
    let roundUpdate = document.createElement("p"); 
    let userIcon;
    let compIcon;

    /*  ROCK DETAILS
        "rock-2"
        "viewBox", "0 0 66 68"

        PAPER DETAILS
        "paper-2"
        "viewBox" ,"0 0 80 90"

        SCISSOR DETAILS
        "scissor-2"
        "viewBOX", "-10 -75 90 64"
    */

    hiddenWeaponIcons.forEach(weapon => {
            if(parseInt(weapon.id) === userAction){
                userIcon = weapon.cloneNode(true);
                userIcon.classList.remove("hide");
                if(userAction === rock){
                    userIcon.classList.add("rock-2");
                    userIcon.setAttribute("viewBox", "0 0 66 68");
                } else if(userAction === paper){
                    userIcon.classList.add("paper-2");
                    userIcon.setAttribute("viewBox", "0 0 80 90");
                } else if(userAction === scissor){
                    userIcon.classList.add("scissor-2");
                    userIcon.setAttribute("viewBox", "-10 -75 90 64");
                }

            }
    });

    hiddenWeaponIcons.forEach(weapon => {
        if(parseInt(weapon.id) === compAction){
            compIcon = weapon.cloneNode(true);
            compIcon.classList.remove("hide");
            if(compAction === rock){
                compIcon.classList.add("rock-2");
                compIcon.setAttribute("viewBox", "0 0 66 68");
            } else if(compAction === paper){
                compIcon.classList.add("paper-2");
                compIcon.setAttribute("viewBox", "0 0 80 90");
            } else if(compAction === scissor){
                compIcon.classList.add("scissor-2");
                compIcon.setAttribute("viewBox", "-10 -75 90 64");
            }

        }
});

    if(roundWinner === "user"){
        userIcon.classList.add("won-fill");
        compIcon.classList.add("lost-fill");
    } else if(roundWinner === "computer"){
        userIcon.classList.add("lost-fill");
        compIcon.classList.add("won-fill");
    }

    roundUpdate.classList.add("round-counter");
    if(currentRound < 10){
        roundUpdate.textContent = "0"+currentRound;
    } else{
        roundUpdate.textContent = currentRound;
    }
 

    userHistory.appendChild(userIcon);
    compHistory.appendChild(compIcon);
    roundContainer.appendChild(roundUpdate);

}
