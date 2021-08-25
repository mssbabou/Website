class Vector2{
  constructor(x, y){
    this.x = x;
    this.y = y;
  } /
}

class Ball{
  constructor(position, velocity){
    this.position = position;
    this.velocity = velocity;
  }
}

class Paddle{
  constructor(position, speed, length, points){
    this.position = position;
    this.speed = speed;
    this.length = length;
    this.points = points;
  }
}

let width = 1700;
let height = 600;

let startBallRadius = 20;
let startPaddleLength = 200;
let StartPaddleSpeed = 8;
let startPaddlePos = height / 2 - startPaddleLength / 2;
let startPosition = new Vector2(width / 2, height / 2);
let startVelocity = new Vector2(10, 5);

let paddle0 = new Paddle(startPaddlePos, StartPaddleSpeed, startPaddleLength, 0);
let paddle1 = new Paddle(startPaddlePos, StartPaddleSpeed, startPaddleLength, 0);
let ball = new Ball(startPosition, startVelocity);
let ball1 = new Ball(new Vector2(500, 500), new Vector2(0, 0));

function angle(vec1, vec2)
{
   dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
   lenghtvec1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y );
   lenghtvec2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y );
   let angle = Math.acos(dotProduct / (lenghtvec1 * lenghtvec2))
   console.log("angle", Math.round(angle * 180.0 / 3.14159265359, 2));
   return angle;
}
function setup() {
  createCanvas(width, height);
}

function UpdateBall() {
  let _ball = ball;

  if((ball.position.y + startBallRadius / 2) >= height){
    _ball.velocity.y = -ball.velocity.y;
  }else if((ball.position.y - startBallRadius / 2) < 0){
    _ball.velocity.y = -ball.velocity.y;
  }else if((ball.position.x + startBallRadius / 2) >=  width - 30){
    if(ball.position.y > paddle1.position && ball.position.y < paddle1.position + paddle1.length){
      let offsetY = ((ball.position.y - paddle1.position) / paddle1.length) * 100;
      _ball.velocity.x = -ball.velocity.x;
      _ball.velocity.y = ((offsetY - 50) * -10) / 50 * -1;
    }
  }else if((ball.position.x - startBallRadius / 2) < 30){
    if(ball.position.y > paddle0.position && ball.position.y < paddle0.position + paddle0.length){
      let offsetY = ((ball.position.y - paddle0.position) / paddle0.length) * 100;
      _ball.velocity.x = -ball.velocity.x;
      _ball.velocity.y = ((offsetY - 50) * -10) / 50 * -1;
    }
  }

  if(ball.position.x <= 20){
    paddle1.points++;
    ResetGame();
  }else if(ball.position.x >= width - 20){
    paddle0.points++;
    ResetGame();
  }
  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;
}

function ResetGame() {
  let randomY = random(-10, 10);
  let randomX = floor(random(0, 2));
  if(randomX == 0){
    ball.velocity = new Vector2(-startVelocity.x, randomY);
  }else if(randomX == 1){
    ball.velocity = new Vector2(startVelocity.x, randomY);
  }

  ball.position = new Vector2(width / 2, height / 2);
}

function MoveTowards(currentPos, targetPos, speed) {
  let diffX = targetPos.x - currentPos.x;
  let diffY = targetPos.y - currentPos.y;
  
  textSize(20);
  text("Diff = " + diffX + " | " + diffY, 50, 50);
  console.log(diffX + " " + diffY);

  let vectorX = diffX == 0 || diffY == 0 ? (diffX < 0? -1 : 1) : diffX / MinFrom0(diffX, diffY);
  let vectorY = diffX == 0 || diffY == 0 ? (diffY < 0? -1 : 1) : diffY / MinFrom0(diffX, diffY);

  text("Vector = " + vectorX + " | " + vectorY, 50, 90);

  diffX = diffX < speed && diffX > -speed? 0 : (diffX < 0? -1 : 1);
  diffY = diffY < speed && diffY > -speed? 0 : (diffY < 0? -1 : 1);

  vectorX = vectorX * diffX;
  vectorY = vectorY * diffY;

  text("New Vector = " + vectorX + " | " + vectorY, 50, 130);
  text("Diff = " + diffX + " | " + diffY, 50, 170);
  text("Pos = " + currentPos.x + " | " + currentPos.y, 50, 210);
  console.log(vectorX + " " + vectorY + " | " + diffX + " " + diffY + " | " + currentPos.x + " " + currentPos.y);

  return new Vector2(currentPos.x + vectorX * speed, currentPos.y + vectorY * speed);
}

function MinFrom0(value0, value1) {
  if (value0 == 0 || value1 == 0){
    return 1;
  }else if (value0 < 0 && value0 < value1){
    return value1;
  }else if (value1 < 0 && value1 < value0){
    return value0;
  }else if(value0 < value1){
    return value0;
  }else if(value1 <= value1){
    return value1;
  }
}

function DrawPlayer() {
  stroke(255);
  fill(255);
  //ball1.position = MoveTowards(ball1.position, new Vector2(mouseX, mouseY), 1);
  //circle(ball.position.x, ball.position.y, startBallRadius);
  circle(ball.position.x, ball.position.y, startBallRadius);
}

function mousePressed() {
  ball1.position = Vector2.MoveTowards(ball1.position, ball.position, 1);
  console.log(MoveTowards(ball1.position, new Vector2(10, 400), 1));
}

function DrawPaddle() {
  fill(200);
  stroke(200);
  rect(10, paddle0.position, 20, paddle0.length);
  rect(width - 30, paddle1.position, 20, paddle1.length);
}

function draw() {
  if(keyIsDown(87) && paddle0.position > 0){
    paddle0.position -= paddle0.speed;
  }else if(keyIsDown(83) && (paddle0.position + paddle0.length) < height){
    paddle0.position += paddle0.speed;
  }
  /*
  if(keyIsDown(38) && paddle1.position > 0){
    paddle1.position -= paddle1.speed;
  } else if (keyIsDown(40) && (paddle1.position  + paddle1.length) < height){
    paddle1.position += paddle1.speed;
  }
  */
  //console.log(ball.position.y);
  //console.log(paddle1.position);
  //paddle1.position = Vector2.MoveTowards(new Vector2(1, paddle1.position), new Vector2(1, ball.position.y), 1).y;
  background(60);
  UpdateBall();
  DrawPlayer();
  DrawPaddle();
  textSize(32);
  fill(255);
  text("|  " + paddle0.points + "  |  " + paddle1.points + "  |", width / 2 - 32, 50);
}

