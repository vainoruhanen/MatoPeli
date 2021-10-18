const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let speed = 7; //voi säätää madon/"pelin" nopeutta

let area = 20;
let tiles = canvas.width / area-2;
let hX = 10; // madon pään aloituspaikka  
let hY = 10; // saattaa olla hieman epäselvää kun 
let xV = 0; // v=velocity 
let yV = 0;

var omenat = []; //array omenoille / ruoille











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
  drawOmena();
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


//-------------------------------------------------------------------------------------------------------------------------------------



class Ruoka{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
    }

    draw(){     //piirtää omenan/ruoan näytölle
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height); 
        ctx.fillStyle = "#FF0000";
        ctx.fill(); 
    }
}



function luoOmena(){ //Luo omenan/ruoan
    max = 380;
    min = 20;
   var num1 = Math.floor(Math.random() * (max - min + 1) + min);
   var num2 = Math.floor(Math.random() * (max - min + 1) + min);
    width = 20;
    height = 20;
    x = Math.ceil(num1 / width) * width;          //pitäs toimia sillei että ruoan mahdolliset sijainnit on ruoan koon välein
    y = Math.ceil(num2 / width) * width;

    const ruoka = new Ruoka(x, y);
    omenat.push(ruoka);         //lisää luodun omenan omenat arrayhin
}


                     
luoOmena(); // luo omenan kokeilua varten

function drawOmena(){
    omenat.forEach((omena) =>{
        omena.draw();
    })
    
}