// element canvas
const canvas = document.getElementById("pong");

// getContext of canvas = métodos e propriedades para desenhar e fazer muitas coisas na tela.
const ctx = canvas.getContext('2d');

// Objeto = Bola
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

const user = {
    x : 0, 
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

const com = {
    x : canvas.width - 10, 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// desenhe um retângulo, será usado para desenhar pás
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// desenhar círculo, será usado para desenhar a bola
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// movimento do mouse
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

// quando COM ou USER pontua deve se zerar a bola 
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// detecção de colisão
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// função de atualização, a função que faz todos os cálculos
function update(){
    
    // muda a pontuação dos jogadores, se a bola vai para a esquerda "bola.x <0" vitória do computador, senão se "bola.x> canvas.width" ganha o usuário
    if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    // velocidade da bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // IA
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;

    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
    if(collision(ball,player)){

        hit.play();
   
        let collidePoint = (ball.y - (player.y + player.height/2));

        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        
      
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
     
        ball.speed += 0.1;
    }
}

// função render, a função que faz todo o desenho
function render(){
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // Desenho dos pontos
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    drawText(com.score,3*canvas.width/4,canvas.height/5);
    
    drawNet();
    
    // Desenho do Jogador
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // desenho da IA 
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // Desenho da bola
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
// FPS
let framePerSecond = 50;
let loop = setInterval(game,1000/framePerSecond);

