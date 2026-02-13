//canvas setup
let pongCanvas;
let canvasWidth = 700;
let canvasHeight = 500;
let context;

//pong paddle 
let paddleWidth = 10;
let paddleHeight = 60;
let paddleVelocityY = 0;

//ball
let ballHeight = 10;
let ballWidth = 10;
let ball = {
    x: canvasWidth/2 - ballWidth/2,
    y: canvasHeight/2 - ballHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 2,
    velocityY : 2,
};

//player 
let player1 = {
    x:10,
    y : canvasHeight/2 - paddleHeight/2,
    width : paddleWidth,
    height : paddleHeight,
    velocityY : paddleVelocityY,
};
let player2 = {
    x : canvasWidth - paddleWidth -10,
    y : canvasHeight/2 - paddleHeight/2,
    width : paddleWidth,
    height : paddleHeight,
    velocityY : paddleVelocityY,
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
    let newPlayer1Y = player1.y + player1.velocityY;
    if (!outofBounds(newPlayer1Y)) {
        player1.y = newPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //p2    
    let newPlayer2Y = player2.y + player2.velocityY;
    if (!outofBounds(newPlayer2Y)) {
        player2.y = newPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    //ball
    context.fillStyle = "#FFFFFF";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
        if(ball.y <=0 || ball.y + ball.height >= canvasHeight){
            ball.velocityY *= -1;
        }
        if (colisionDetection(ball, player1) || colisionDetection(ball, player2)){
            ball.velocityX *= -1;
  
            let hitPaddle = colisionDetection(ball, player1) ? player1 : player2;
            let hitPos = (ball.y - hitPaddle.y) / hitPaddle.height;
            ball.velocityY = (hitPos - 0.5) * 6;

            ball.velocityY += hitPaddle.velocityY * 0.3;

            ball.velocityX = (ball.velocityX > 0 ? 1 : -1) * Math.min(4, Math.abs(ball.velocityX) + 0.2);
            ball.velocityY = Math.max(-4, Math.min(4, ball.velocityY));
        }
            //game over
            if(ball.x<0){
                player2Points++;
                gameReset(1);
            }   
            else if(ball.x+ballWidth>canvasWidth){
                player1Points++;
                gameReset(-1)
            }
            //score
            context.font="45px sans-sarif"
            context.fillText(player1Points,canvasWidth/5,45);
            context.fillText(player2Points,canvasWidth*4/5-45,45);
}

function updateVelocities(e){
    player1.velocityY = 0;
    player2.velocityY = 0;
    //p1
    if (heldKeys.w){
        player1.velocityY = -3;
    }
    else if (heldKeys.s){
        player1.velocityY = 3;
    }

    //p2
    if (heldKeys.ArrowUp){
        player2.velocityY = -3;
    }
    else if (heldKeys.ArrowDown){
        player2.velocityY = 3;
    }
}

function colisionDetection(a, b){
    return (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y);
}

function gameReset(direction){

    ball.x = canvasWidth/2 - ball.width/2;
    ball.y = canvasHeight/2 - ball.height/2;
    ball.velocityX = direction * 2;
    ball.velocityY = (Math.random() - 0.5) * 4;
};

