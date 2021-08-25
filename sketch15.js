let posA = new Vector2(10, 10);
let posB = new Vector2(10, 10); 

let aAngle = 10;
let bAngle = 10;

class Vector2{
  constructor(x, y){
    this.x = x;
    this.y = y;
  } 
} 

function setup() {
  createCanvas(600, 600);
  background(60);
  
}

function draw() {
  console.log(tan(10));
}

function GetTriangulation(a, b, a1, b1) {
  let c = new Vector2();

  
  
}

function ToMineAngle(_angle) {
  if (_angle < 180){
    return _angle;
  }
  return _angle - 360;
}