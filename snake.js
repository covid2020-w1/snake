/*
X1. draw board
X2. draw snake head
X3. draw food that's randomly placed each time
X4. make snake head move
X5. prevent snake head from doubling back
X6. make food disappear and respawn when snake head intersects food
X7. draw a segment for the snake's body every time the snake head eats food
X8. have the snake body move tail-first to the head
9. set endgame conditions when snake moves out of canvas
10. set endgame conditions when snake eats itself
*/

//board
var board;
var context;
var boxSize = 25;
var rows = 20;
var cols = 20;

//snake head
var snakeX = boxSize * 5;
var snakeY = boxSize * 5;
var xVelocity = 0;
var yVelocity = 0;

//food
var foodX;
var foodY;

//snake body
var snakeBody = [];

//endgame
var gameOver = false;

var score = 0;

window.onload = function(){
    board = document.getElementById("board");
    board.width = cols * boxSize;
    board.height = rows * boxSize;
    context = board.getContext("2d");


    placeFood();
    setInterval(update, 1000/10);

    document.addEventListener("keydown", moveSnake)
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, boxSize, boxSize);


    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += xVelocity * boxSize;
    snakeY += yVelocity * boxSize;
    context.fillRect(snakeX, snakeY, boxSize, boxSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
    }
    

    if(snakeX < 0 || snakeX > board.width || snakeY < 0 || snakeY > board.height){
        gameOver = true;
        alert("Trying to escape? Game over!")
    }

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("You ate yourself. Cannibalism is forbidden— Game over!")
        }
    }

    context.font = "16px sans-serif";
    context.fillText(score, 10, 10);

    score = snakeBody.length;
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * boxSize;
    foodY = Math.floor(Math.random() * rows) * boxSize;
}

function moveSnake(e){
    if(e.code == "ArrowUp" && yVelocity != 1){
        xVelocity = 0;
        yVelocity = -1;
    }

    else if(e.code == "ArrowDown" && yVelocity != -1){
        xVelocity = 0;
        yVelocity = 1;
    }

    else if(e.code == "ArrowLeft" && xVelocity != 1){
        xVelocity = -1;
        yVelocity = 0;
    }

    else if(e.code == "ArrowRight" && xVelocity != -1){
        xVelocity = 1;
        yVelocity = 0;
    }
}
