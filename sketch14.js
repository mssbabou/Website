let scale = 1;
let ballRadius = 20;
let Balls = [];

class Vector2{
  constructor(x, y){
    this.x = x;
    this.y = y;
  } 
}

function mousePressed(){
  Balls.push(new Vector2(mouseX, mouseY));
}

function setup() {
  createCanvas(600, 600); 
  background(60);}

function DrawBalls() {
  fill(255);
  stroke(255);
  for (let i = 0; i < Balls.length; i++) {
    circle(Balls[i].x, Balls[i].y, ballRadius);    
  }
}

function ScaleBalls(scale_) {
  if(Balls.length < 2){
    return;
  }

  let midpoint = new Vector2(0, 0);
  let ballsVector = [];
  let newBallScale = [];

  for (let i = 0; i < Balls.length; i++) {
    midpoint.x += Balls[i].x;
    midpoint.y += Balls[i].y;
  }

  midpoint.x = midpoint.x / Balls.length;
  midpoint.y = midpoint.y / Balls.length;
  
  for (let i = 0; i < Balls.length; i++) {  
    ballsVector.push(new Vector2(midpoint.x - Balls[i].x, midpoint.y - Balls[i].y));
    ballsVector[i] = NormalizeVector(ballsVector[i]);
  }

  for (let i = 0; i < Balls.length; i++) {
    newBallScale.push(new Vector2(Balls[i].x + (ballsVector[i].x * scale_), Balls[i].y + (ballsVector[i].y * scale_)))
  }

  Balls = newBallScale;

}

function keyPressed() {
  ScaleBalls(scale);
}

function NormalizeVector(vector) {
  let normalVector = new Vector2();
  normalVector.x = vector.x / (Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)));
  normalVector.y = vector.y / (Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)));
  return normalVector;
}

function draw() {
  background(60);
  DrawBalls();
}