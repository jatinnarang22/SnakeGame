let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let body = document.querySelector("body");
body.style.backgroundImage = "url('snake.png')";

let cellsize = 50;
let borderheight = 550;
let borderwidth = 950;
let snake = [
  [0, 0],
  [50, 0],
];
let foodcells = generateRandom();
let score = 0;
let gameover = false;
let direction = "right";
let interval = setInterval(function () {
  update();
  draw();
}, 100);

document.addEventListener("keydown", function (event) {
  // console.log(event);
  if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowDown") {
    direction = "down";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  } else if (event.key === "ArrowRight") {
    direction = "right";
  }
});

function update() {
  let headx = snake[snake.length - 1][0];
  let heady = snake[snake.length - 1][1];

  let newheadx;
  let newheady;

  if (direction === "right") {
    newheadx = headx + cellsize;
    newheady = heady;
    if (newheadx === borderwidth) gameover = true;
  } else if (direction === "down") {
    newheadx = headx;
    newheady = heady + cellsize;
    if (newheady === borderheight) gameover = true;
  } else if (direction === "up") {
    newheadx = headx;
    newheady = heady - cellsize;
    if (newheady < 0) gameover = true;
  } else {
    newheadx = headx - cellsize;
    newheady = heady;
    if (newheadx < 0) gameover = true;
  }
  let flag = 0;
  if (newheadx === foodcells[0] && newheady == foodcells[1]) {
    foodcells = generateRandom();
    flag = 1;
    score++;
  }
  snake.push([newheadx, newheady]);
  if (flag === 0) snake.shift();
}

function draw() {
  if (gameover === true) {
    clearInterval(interval);
    ctx.fillStyle = "red";
    ctx.font = "50px snas-serif";
    ctx.fillText("Game Over", borderwidth / 2 - 200, borderheight / 2);
    return;
  }

  ctx.clearRect(0, 0, borderwidth, borderheight);
  //snake drow
  for (let cell of snake) {
    ctx.fillStyle = "#08b008";
    ctx.fillRect(cell[0], cell[1], cellsize, cellsize);
    ctx.strokeStyle = "White";
    ctx.strokeRect(cell[0], cell[1], cellsize, cellsize);
  }
  //food
  ctx.fillStyle = "red";
  ctx.fillRect(foodcells[0], foodcells[1], cellsize, cellsize);
  //drow score
  ctx.font = "24px sans-serif";
  ctx.fillText(`Score: ${score}`, 20, 20);
}

function generateRandom() {
  return [
    Math.round((Math.random() * (borderwidth - cellsize)) / cellsize) *
      cellsize,
    Math.round((Math.random() * (borderheight - cellsize)) / cellsize) *
      cellsize,
  ];
}

// check at home math.round((Matxh.random()*100)/10)*10;
