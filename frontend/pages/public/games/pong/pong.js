//canvas setup
let pongCanvas;
let canvasWidth = 500;
let canvasHeight = 500;
let context;

//pong paddle 
let paddleWidth = 10;
let paddleHeight = 50;
let paddleVolocityY =0;

//ball
let ballHeight = 10;
let ballWidth = 10;
let ball = {
    x: canvasWidth/2 - ballWidth/2,
    y: canvasHeight/2 - ballHeight/2,
    width: ballWidth,
    height: ballHeight,
    volocityX : 1,
    volocityY : 2,
};

//player 
let player1 = {
    x:10,
    y : canvasHeight/2 - paddleHeight/2,
    width : paddleWidth,
    height : paddleHeight,
    volocityY : paddleVolocityY,
};
let player2 = {
    x : canvasWidth - paddleWidth -10,
    y : canvasHeight/2 - paddleHeight/2,
    width : paddleWidth,
    height : paddleHeight,
    volocityY : paddleVolocityY,
}

//player points
let player1Points = 0;
let player2Points = 0;

//key handling
let heldKeys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

document.addEventListener('keydown', (event) => {
    heldKeys[event.key] = true;
    if (event.key === 'w') heldKeys.s = false;
    if (event.key === 's') heldKeys.w = false;
    if (event.key === 'ArrowUp') heldKeys.ArrowDown = false;
    if (event.key === 'ArrowDown') heldKeys.ArrowUp = false; 
    
});
document.addEventListener('keyup', (event) => {
    heldKeys[event.key] = false;
});


//canvas load
window.onload = function() {
    pongCanvas = document.getElementById("pongCanvas");
    pongCanvas.width = canvasWidth;
    pongCanvas.height = canvasHeight;
    context = pongCanvas.getContext("2d");

//player draw
    context.fillStyle = "#d22525"; 
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    requestAnimationFrame(update);
};

function outofBounds(yPosition){
    return (yPosition < 0 || yPosition + paddleHeight > canvasHeight);
}

function update(){
    updateVelocities();
    requestAnimationFrame(update);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //p1
    let newPlayer1Y = player1.y + player1.volocityY;
    if (!outofBounds(newPlayer1Y)) {
        player1.y = newPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //p2    
    let newPlayer2Y = player2.y + player2.volocityY;
    if (!outofBounds(newPlayer2Y)) {
        player2.y = newPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    //ball
    context.fillStyle = "#FFFFFF";
    ball.x += ball.volocityX;
    ball.y += ball.volocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
        if(ball.y <=0 || ball.y + ball.height >= canvasHeight){
            ball.volocityY *= -1;}
        if (colisionDetection(ball, player1) || colisionDetection(ball, player2)){
            ball.volocityX *= -1;}

}

function updateVelocities(e){
    player1.volocityY = 0;
    player2.volocityY = 0;
    //p1
    if (heldKeys.w){
        player1.volocityY = -3;
    }
    else if (heldKeys.s){
        player1.volocityY = 3;
    }

    //p2
    if (heldKeys.ArrowUp){
        player2.volocityY = -3;
    }
    else if (heldKeys.ArrowDown){
        player2.volocityY = 3;
    }
}

function colisionDetection(a, b){
    return (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y);
}