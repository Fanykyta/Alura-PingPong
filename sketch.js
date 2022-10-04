//variaveis da bola 
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro / 2;
// variaveis do movimento 
let velocidadeXBola = 3;
let velocidadeYBola = 3;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 150;
let comprimentoRaquete = 100;
let larguraRaquete = 10;

let colisao = false;


//variaveis da raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//variaveis do placar
let meusPontos = 0;
let pontosOponente = 0;

// variaveis do som
let ponto;
let trilha;
let raquetada;

function preload(){
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete,yRaquete);
  movimentaRaquete();
  //verificaColisaoRaquete();
  colisaoBiblioteca(xRaquete,yRaquete);
  colisaoBiblioteca(xRaqueteOponente,yRaqueteOponente);
  mostrarRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteoponente();
  exibirPlacar();
  marcaPontos();
}
function mostraBola(){  
  circle(xBola, yBola, diametro);
}

function movimentaBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificaColisaoBorda() {
    if (xBola + raio > width || xBola - raio < 0) {
        velocidadeXBola *= -1;
    }
    if (yBola + raio > height || yBola - raio < 0) {
        velocidadeYBola *= -1;
    }
}

function mostrarRaquete(x,y){
   rect(x,y,larguraRaquete, comprimentoRaquete);
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
    if (xBola - raio < xRaquete + larguraRaquete
        && yBola - raio < yRaquete + comprimentoRaquete
        && yBola+ raio > yRaquete) {
        velocidadeXBola *= -1;
    }
}

function colisaoBiblioteca(x,y){
  colisao = collideRectCircle(x, y, larguraRaquete, comprimentoRaquete, xBola, yBola, raio);
  if(colisao){
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteoponente(){
  velocidadeYOponente = yBola - yRaqueteOponente - comprimentoRaquete /2 -30;

  yRaqueteOponente += velocidadeYOponente;
}

function exibirPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(20)
  fill(255,140,0);
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 25);
  fill(255,140,0);
  rect(450,10,40,20);  
  fill(255);
  text(pontosOponente, 470, 25);
}

function marcaPontos(){
  if(xBola > 592){
    meusPontos += 1;
    ponto.play();
  }
  if(xBola < 8){
    pontosOponente += 1;
    ponto.play();
  }
}