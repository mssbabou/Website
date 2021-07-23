pointSize = 10;

let Points = [];
let Lines = [];

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line{
  constructor(point0, point1){
    this.point0 = point0;
    this.point1 = point1;
  }
}

function setup() {
  createCanvas(600, 600);
  background(60);
}

function draw() {
  DrawPoints();
}

function MakePath() {
  let newPoints = Points;
  let usedPoints = [];
  let currentPoint = 0;
  let nextpoint = 0;

  for (let i = 0; i < newPoints.length; i++) {
    nextpoint = FindNearest(currentPoint);
    console.log(currentPoint + " : " + nextpoint);
    Lines.push(new Line(newPoints[currentPoint].x, newPoints[currentPoint].y, newPoints[nextpoint].x, newPoints[nextpoint].y));
    usedPoints.push(newPoints[currentPoint]);
    currentPoint = nextpoint;
  }

  DrawLines();
  console.log(Lines);
}

function compare(a, b)
{
  return (a.distance> b.distance) ? -1 : ((a.distance< b.distance) ? 1 : 0);
};

function FindNearest(x) {
  let newPoints = [];

  for (let i = 0; i < Points.length; i++) {
    if (x != i) {
      newPoints.push({"distance" :Distance(x, i), "index" : i});
    }
  }
  newPoints.sort(compare);
  let result = newPoints[newPoints.length - 1].index;
  return result;
}

function FindNearest1(x, y) {
  let newPoints = [];

  for (let i = 0; i < Points.length; i++) {
    if (x != i) {
      newPoints.push({"distance" :dist(x, y, newPoints[i].x, newPoints[i].y), "index" : i});
    }
  }
  newPoints.sort(compare);
  let result = newPoints[newPoints.length - 1].index;
  return newPoints[newPoints.length - 1];
}


function Distance(a, b) {
  let x = Points[a].x - Points[b].x;
  let y = Points[a].y - Points[b].y;

  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function mousePressed() {
  Points.push(new Point(mouseX, mouseY));
}

function DrawPoints() {
  for (let i = 0; i < Points.length; i++) {
    stroke(20);
    fill(255);
    circle(Points[i].x, Points[i].y, pointSize);
  }
}

function FindNearestRandom(x) {
  let newPoints = [];
  let maxWeight = 0;
  let maxChance = 0;
  let accChance = 0;

  for (let i = 0; i < Points.length; i++) {
    if (x != i) {
      newPoints.push({"distance" :Distance(x, i), "index" : i});
    }
  }

  for (let i = 0; i < newPoints.length; i++) {
    maxWeight += newPoints[i].distance;
  }

  for (let i = 0; i < newPoints.length; i++) {
    newPoints[i].Weight = maxWeight / newPoints[i].distance;
    maxChance += newPoints[i].Weight;
  }

  let randomNum = floor(random(0, maxChance));
  for (let i = 0; i < newPoints.length; i++) {
    accChance += newPoints[i].Weight;
    if (accChance > randomNum){
      console.log(newPoints[i]);
      console.log(Points[i]);
      console.log(Points);
      return newPoints[i].index; 
    }
  }
}

function DrawLines() {
  for (let i = 0; i < Lines.length; i++) {
    stroke(255);
    fill(255);
    line(Lines[0].x0, Lines[0].y0, Lines[0].x1, Lines[0].y1);
  }
}

function keyPressed() {
  if (key == " ") {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          set(x, y, dist(x, y, FindNearest1(x, y).x, FindNearest1(x, y).y));
        }    
      }
  }
}

