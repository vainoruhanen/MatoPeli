const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let speed = 7; //voi säätää madon/"pelin" nopeutta



let area = 20;
let tiles = canvas.width / area-2;
let hX = 10; // madon pään aloituspaikka  
let hY = 10; // saattaa olla hieman epäselvää kun lyhennän asioit
let aX = 0;
let aY = 0;
let xV = 0; // v=velocity 
let yV = 0;

var omenat = []; //array omenoille / ruoille


document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if(e.key == "w") {
    if(yV==1) return;
      yV=-1;
      xV=0;
  } if(e.key == "a") {
      if(xV==1) return;
        yV=0;
        xV=-1;
    } if(e.key == "s") {
        if(yV==-1) return;
          yV=1;
          xV=0;
      } if(e.key == "d") {
          if(xV==-1) return;
            yV=0;
            xV=1;
        }
}

function Draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Move();
  checkApple();
  drawOmena();
  drawSnake();
  setTimeout(Draw, 1000 / speed);
}

function drawSnake() {
  ctx.beginPath();
  ctx.rect(hX*area, hY*area, tiles,tiles)
  ctx.fillStyle = '#ffffff'
  ctx.fill();
  ctx.closePath();
}

function Move() {
  hX+=xV;
  hY+=yV;
}

function checkApple() {
  if(aX===hX && aY===hY) {
    var score = omenat.length; // laskee pisteet nyt
    document.getElementById("score").innerHTML = score;
    luoOmena()
  }
}


function osuukoReunaan(){
  if(hX < 0 || hX >= 20 || hY >= 20 || hY < 0){ //jos menee osuu reunaan/ menee yli
    console.log("game over bish"); //tänne varmaan jossain vaiheessa joku gamover() tai vastaava funktio
  }
}


//-------------------------------------------------------------------------------------------------------------------------------------


class Ruoka{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 18;
        this.height = 18;
    }

    draw(){     //piirtää omenan/ruoan näytölle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(this.x*area, this.y*area, tiles,tiles); 
        ctx.fillStyle = "#FF0000";
        ctx.fill(); 
    }
}



function luoOmena(){ //Luo omenan/ruoan
  aY = Math.floor(Math.random() * area);
  aX = Math.floor(Math.random() * area);
  const ruoka = new Ruoka(aX, aY);
  omenat.push(ruoka); //lisää luodun omenan omenat arrayhin
}

function drawOmena(){
    omenat.forEach((omena) =>{
        omena.draw();
    })
    
}


Draw();
luoOmena();
