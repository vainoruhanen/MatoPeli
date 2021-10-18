const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 7; //voi säätää madon/"pelin" nopeutta

let area = 20;
let tiles = canvas.width / area-2;
let hX = 10; // madon pään aloituspaikka  
let hY = 10; // saattaa olla hieman epäselvää kun 
let xV = 0; // v=velocity 
let yV = 0;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if(e.key == "w") {
    yV=-1;
    xV=0;
  } if(e.key == "a") {
      yV=0;
      xV=-1;
    } if(e.key == "s") {
        yV=1;
        xV=0;
      } if(e.key == "d") {
          yV=0;
          xV=1;
        }
}

function Draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  Move();
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

Draw();
