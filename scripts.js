//setTimeout

let animacao = window.requestAnimationFrame || function(callback){
    window.setTimeout(callback, 1000/60);
}
//Renderizando com canvas
let canvas = document.createElement("canvas");
let width = 400;
let height = 600;
canvas.width = width;
canvas.height = height;
let contexto = canvas.getContext("2d");


//Atualizar todos os objetos;
//Renderizar os objetos;
//Utilizar a recursão, chamando a função step novamente.
let step = function(){
    atualizar();
    renderizar();
    animacao(step);
};

let renderizar = function(){
    contexto.fillStyle = "#836FFF";
    contexto.fillRect(0, 0, width, height);
}
function Raquete(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocidade_x = 0;
    this.velocidade_y = 0;
}
function Raquete(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocidade_x = 0;
    this.velocidade_y = 0;
}

Raquete.prototype.renderizar = function(){
    contexto.fillStyle = "black";
    contexto.fillRect(this.x, this.y, this.width, this.height);
};
function Jogador(){
    this.raquete = new Raquete(175, 580, 50, 10);
}

function Computador(){
    this.raquete = new Raquete(175, 10, 50, 10);
}
Jogador.prototype.renderizar = function(){
    this.raquete.renderizar();
}

Computador.prototype.renderizar = function(){
    this.raquete.renderizar();
}
function Bolinha(x, y){
    this.x = x;
    this.y = y;
    this.velocidade_x = 0;
    this.velocidade_y = 3;
    this.radius = 5;
}

Bolinha.prototype.renderizar = function() {
    contexto.beginPath();
    contexto.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    contexto.fillStyle="white";
    contexto.fill();
};
let jogador = new Jogador();

let computador = new Computador();

//A bolinha será renderizada no centro da tela
let bolinha = new Bolinha(200,300);
let renderizar = function(){
    contexto.fillStyle = "#836FFF";
    contexto.fillRect(0, 0, width, height);
    //Atualizar a partir daqui
    jogador.renderizar();
    computador.renderizar();
    bolinha.renderizar();
}