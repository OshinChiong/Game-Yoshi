const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 600;
const w = canvas.width;
const h = canvas.height;

document.getElementById("start-button").onclick = () => {
  startGame();
};

class Yoshi {
  constructor() {
    this.x = canvas.width / 2 - 50;
    this.y = canvas.height / 2 - 50;
    this.w = 50;
    this.h = 50;
    this.score = 0;
  }
}

let player = new Yoshi();

const yo = new Image();
yo.src = "/images/yoshi caminando.gif";
yo.onload = function () {
  ctx.drawImage(yo, player.x, player.y, player.w, player.h);
};

let apple = new Image ();
  apple.src = "/images/apple.jpg";

  let banana = new Image();
  banana.src = "/images/banana new.jpg";
  
  let orange = new Image();
    orange.src = "/images/orange new.png";

class Fruits {
  constructor(id){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.w = 20;
    this.h = 20;
    this.points = this.generatePoints();
    this.id = id;
    this.image = this.generateFruits();
    this.pointValue = 5;
  }
  
  generateFruits = () => {
    let fruitsArr = [banana, apple, orange]
    
    let x = Math.floor(Math.random()* fruitsArr.length)
    return fruitsArr[x]
  }
  
  generatePoints = () => {
    return Math.floor(Math.random()*5)+1
  }
}

let fruitsArr = [];
function addFruits() {
  fruitsArr.push(new Fruits(id++));
};

class Enemie {
  constructor(id) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.w = 50;
    this.h = 50;
    this.pointValue = -1;
  }
}
generateEnemie = () => {
  const enemieArr = ["enemie"];
};

let enemieArr = [];
let id = 0;
function addEnemie() {
  enemieArr.push(new Enemie(id++));
}

let int;
function startGame() {
  int = setInterval(addEnemie, 1000);
  int = setInterval(addFruits, 1000)
  animate();
}

let score;
let game;


function animate() {
  game = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "28px sans-serif";
  ctx.fillText(`Score: ${player.score}`, 70, 30);
  ctx.drawImage(yo, player.x, player.y, player.w, player.h);

  for (let i = 0; i < enemieArr.length; i++) {
    let image = new Image();
    image.src = "/images/yellow.jpg";
    ctx.drawImage(
      image,
      enemieArr[i].x,
      enemieArr[i].y,
      enemieArr[i].w,
      enemieArr[i].h
    );
     enemieArr[i].x+=2;

     let didCollide = detectEnemie(player, enemieArr[i]);
     console.log("didCollide",didCollide)
     if (didCollide) {
       console.log("Collision")
       gameOver();
     }
    }

  for(let i = 0; i < fruitsArr.length; i++){
    const fruta = fruitsArr[i]
    ctx.drawImage(fruta.image, fruta.x, fruta.y, fruta.w, fruta.h);
    detectCollision(player, fruta)
       }
    

  }

  function gameOver() {
    window.cancelAnimationFrame(game);
    clearInterval(int);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "red";
    ctx.font = "50px sans-serif";
    ctx.fillText("GAME OVER", 100, 100);
    ctx.fillStyle = "white";
    ctx.font = "50px sans-serif";
    ctx.fillText(`Final Score: ${player.score}`, 100, 300);
  }


document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      if (player.y - 20 < 0){
        player.y -=0;
      } else {
        player.y -=15;
      }
      break;
    case "ArrowDown":
      player.y += 10;
      break;
    case "ArrowLeft":
      if(player.x -10 < 0){
        player.x -=0;
      } else {
        player.x -=15;
      }
      break;
    case "ArrowRight":
     if (player.x + player.w + 10 > w) {
       player.x = w - player.w;
     } else {
       player.x += 15;
     };
      break;
  }
});

function detectCollision(player, obj){
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) { 
    player.score+=obj.points;
    
    fruitsArr = fruitsArr.filter(fruits=>{
      return fruits.id !== obj.id
    })
   
  }
}
  function detectEnemie (player, enemie){
    if (
      player.x < enemie.x + enemie.w &&
      player.x + player.w > enemie.x &&
      player.y < enemie.y + enemie.h &&
      player.y + player.h > enemie.y
    ) {
      return true
    }

  
  
  }
  
  