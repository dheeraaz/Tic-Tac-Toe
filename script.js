"use strict";

const boxes = document.querySelectorAll(".app .box");
const newGameBtn = document.querySelector(".new-game");
const message = document.querySelector(".messagebox p");


let turnX = true; //for players turn: player-X, player-O

const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

function displayMessage(msg) {
    message.innerText = msg;
}

//for restarting game
newGameBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        turnX = true;
        box.disabled = false;
        message.innerText = "Player X's turn";

        message.style.color = "";
        message.style.fontWeight = "";
        newGameBtn.style.color = "#0A1115";
        newGameBtn.innerText = "Restart";

        boxes.forEach((box)=>{
            box.style.color = "white";
        })

    })
})


//for playing game
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            box.disabled = true;
            turnX = false;

            displayMessage("Player O's turn");
            checkWin();

        } else {
            box.innerText = "O";
            box.disabled = true;
            turnX = true;

            displayMessage("Player X's turn");
            checkWin();

        }
    })
})


//checking winning condition
function checkWin() {
    checkDraw();
    winConditions.forEach((c) => {
        if (boxes[c[0]].innerText !== "" && boxes[c[1]].innerText !== "" && boxes[c[2]].innerText !== "") {

            if (boxes[c[0]].innerText === boxes[c[1]].innerText && boxes[c[1]].innerText === boxes[c[2]].innerText) {

                for(let i=0;i<3;i++){
                    boxes[c[i]].style.color = "red";
                }

                displayMessage(`Congratulations!! Player ${boxes[c[0]].innerText} is winner`);

                message.style.color = "red";
                message.style.fontWeight = "700";

                newGameBtn.style.color = "red";
                newGameBtn.innerText = "New Game";

                disableBtn();
            }

        }
    })
}

//for game draw scenario
function checkDraw() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === "") {
            return;
        }
    }

    displayMessage("Its a draw!!!");
    message.style.color = "green";
    message.style.fontWeight = "700";
    newGameBtn.style.color = "red";
    newGameBtn.innerText = "New Game";



}

//for stopping player from playing game even after game-win condition
function disableBtn() {
    boxes.forEach(box => box.disabled = true)
}


