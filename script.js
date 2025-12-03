const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector(".gameInfo")
const btn = document.querySelector('.btnNew');

let currentPlayer;
let gameGrid;

const winnigPossition = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's initalize the game
function initGame() {
    currentPlayer = "X"
    gameGrid = ["","","","","","","","",""];
    btn.classList.remove("active");
    gameInfo.textContent = `Current player - ${currentPlayer}`;
    boxes.forEach((box , index )=>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    })


    
}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }else{
        currentPlayer = "X"
    }
    gameInfo.textContent =`Current Player - ${currentPlayer}`;
}


function checkGameOver() {

    let winner = "";
    let winningBoxes = [];

    winnigPossition.forEach((position) => {

        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[1]] !== "" &&
            gameGrid[position[2]] !== ""
        ) {
            if (
                gameGrid[position[0]] === gameGrid[position[1]] &&
                gameGrid[position[1]] === gameGrid[position[2]]
            ) {
                winner = gameGrid[position[0]];
                winningBoxes = position;  
            }
        }
    });

    // winner found
    if (winner !== "") {
        gameInfo.textContent = `Winner - ${winner}`;

        // disable clicks
        boxes.forEach(box => box.style.pointerEvents = "none");

        winningBoxes.forEach(idx => {
            boxes[idx].classList.add("win");
        });
    }
}



function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index]= currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();

    }
}


boxes.forEach((box, index)=>{
    box.addEventListener("click" ,()=>{
        handleClick(index);
    })
})


btn.addEventListener("click", initGame)