const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 7; 
let area = 20; // voit säätää pelin "asetuksia"
let tiles = canvas.width / area-2;

let hX = 10; // madon pään aloituspaikka  
let hY = 10; // saattaa olla hieman epäselvää kun lyhennän asioit
let aX = 0; //omenoiden koordinaatit
let aY = 0;
let xV = 0; // v=velocity 
let yV = 0;

var ennatysPisteet = 0;
var omenat = []; //array omenoille
var parts = [];
let length = 2;

class Part{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}

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
  let result = gameOver();
  if(result){gameOver();}
  checkApple();
  drawOmena();
  drawSnake();
  setTimeout(Draw, 1000 / speed);
}

function drawSnake() {
  ctx.fillStyle = '#808080'
  for(let i=0; i<parts.length; i++){
    let part = parts[i]
    ctx.fillRect(part.x*area, part.y*area, tiles,tiles)
  } parts.push(new Part(hX, hY)); //
    if(parts.length>length){parts.shift();} //poistaa hännän viimeisimmän osan kun pituus on suurempi kuin sen pitäisi olla
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(hX*area, hY*area, tiles,tiles)
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
    length++;

    if(score>5) {speed=9;}
    if(score>10){speed=11;}
    if(score>15){speed=13;}
    if(score>20){speed=15;}
  }
}

function gameOver(){
  let gOver = false;
  let restart = false;
  if(yV===0 && xV===0){return false;}

  if(hX < 0 || hX === 20 || hY === 20 || hY < 0){ //jos menee osuu reunaan/ menee yli
    gOver = true; 
  }
    for(let i=0; i<parts.length; i++){
      let p = parts[i];                 //ei voi osua itseensä
      if(p.x===hX && p.y===hY){
        gOver = true;
        break;
      }
    }

    if(gOver){
      drawRestart();
      speed = 0;
    }
  return gOver;
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
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];                 //toimii sillein että omena ei spawnaa madon sisälle
    if (p.x === aX && p.y === aY) {luoOmena();}
  }
  const ruoka = new Ruoka(aX, aY);
  omenat.push(ruoka); //lisää luodun omenan omenat arrayhin
}

function drawOmena(){
  omenat.forEach((omena) =>{
    omena.draw();
  })
}

function hideRestart(){
  document.getElementById("restart-nakyma").style.display = "none";             //piilotta restart div elementin
}

function drawRestart(){
  document.getElementById("restart-nakyma").style.display = "block";
}

function restartGame(){   //funktio kutsutaan käyttäjän painaessa restart
  hideRestart();
  hX = 10;
  hY = 10;
  xV = 0;   
  yV = 0;  //resetoi koordinaatit, nopeuden jne
  length = 2;
  speed = 7;
  parts = [];
  if(omenat.length > ennatysPisteet){
    ennatysPisteet = omenat.length - 1; 
  }

  omenat = [];          //nollaa pisteet/pelin
  var score = omenat.length;
  document.getElementById("score").innerHTML = score;
  document.getElementById("ennatys").innerHTML = ennatysPisteet;
  luoOmena();
}

Draw();
luoOmena();
