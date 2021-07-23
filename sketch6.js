let jumpforce = 11;
let size = 50;
let gravity = 0.5;

let accel = 0;
let speed = 0;

function setup() {
  createCanvas(500, 600);
}

function draw() {
  background(60);
  
  stroke(255);
  fill(255);
  text(accel, 10, 20);
  text(speed, 10, 40);
  
  accel -= gravity;
  speed += accel; 

  rect((width / 2) - size / 2, 100 - speed, size, size);

  if(speed <= -height){
    location.reload();
  }
}

function keyPressed() {
  accel = jumpforce;
}