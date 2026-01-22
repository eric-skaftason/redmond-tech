//canvas setup
let pongCanvas;
let canvasWidth = 500;
let canvasHeight = 500;
let context;

//pong paddle 
let paddleWidth = 10;
let paddleHeight = 50;
let paddleVolocityY =0;

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
