let X_AXIS = 1;
let Y_AXIS = 2;

let playerName = "mark";

let greenColor;
let blueColor;

function setup() {
  var cnv = createCanvas(1200, 800);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  c1 = color(70, 70, 70);
  c2 = color(20, 20, 20);

  greenColor = color(137, 226, 52);
  blueColor = color(114, 159, 207);
}

function draw() {
  background(255);
  stroke(45, 9, 34);
  fill(45, 9, 34);
  rect(0, 60, width, height);
  DrawAllText(20);
  setGradient(0, 0, width, 60, c1, c2, Y_AXIS);
}

function DrawAllText(textsize) {
  textSize(textsize);
  fill(greenColor);
  text(playerName + "@bitcoin-miner", 0, 50 + textsize, width, height);
  fill(255);
  text(":   $", 183, 50 + textsize, width, height);
  fill(blueColor);
  text("~", 191, 72, width, height);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}