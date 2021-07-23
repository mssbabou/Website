let gridSize = 6;
let off = 2;
let steps = 100;
let BlockedCells = [];

let Cells = [];
let CellTrace = [];

let w;
let traces = 0;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function keyPressed() {
  if (key == " ") {
    DrawCells();
    CellTrace = [];
    CellTrace[0] = Cells[0][0]
    TraceCells();
    MakeLines();
  }
}

function TraceCells() {
  for (let i = 0; i < steps; i++) {
    TraceCell();
  }
}

function mousePressed() {
  mousex = floor(mouseX / w);
  mousey = floor(mouseY / w);

  if (mouseX < width && mouseY < height) {
    console.log(mousex + " " + mousey);
    console.log(GetNeighbours(new Cell(mousex, mousey)));
  }
}

function setup() {
  createCanvas(600, 600);
  Cells = MakeEmptyBoard(gridSize);
  w = (width / gridSize);
  CellTrace[0] = Cells[0][0];
  BlockedCells[0] = new Cell(1, 0);
  DrawCells();
  //console.log(CellTrace);
}

function draw() {
  if (CellTrace.length != (Cells.length * Cells.length)) {
    CellTrace = [];
    CellTrace[0] = Cells[0][0]
    TraceCells();
    traces++;
  } else {
    DrawCells();
    MakeLines();
    console.log("DONE! WITH " + traces + " STEPS");
  }

}

function TraceCell() {
  let neighbours = GetNeighbours(CellTrace[CellTrace.length - 1]);
  let randomNei = Math.floor(random(0, neighbours.length));

  if (neighbours.length == 0) {
    return;
  } else {
    CellTrace.push(neighbours[randomNei]);
  }

}

function GetNeighbours(cell) {
  let neighbours = [];

  // RIGHT
  if (cell.x < (gridSize - 1)) {
    neighbours.push(Cells[cell.x + 1][cell.y]);
  }
  // DOWN
  if (cell.y < (gridSize - 1)) {
    neighbours.push(Cells[cell.x][cell.y + 1]);
  }
  // LEFT
  if (cell.x >= 1) {
    neighbours.push(Cells[cell.x - 1][cell.y]);
  }
  // UP
  if (cell.y >= 1) {
    neighbours.push(Cells[cell.x][cell.y - 1]);
  }
  //console.clear();
  //console.log("Before ", neighbours);


  neighbours = neighbours.filter(e => { return !CellTrace.includes(e); });
  //console.log("After ", neighbours);
  // for (var n = 0; n < neighbours.length; n++){
  //   for (var t = 0; t < CellTrace.length; t++){ 
  //       if (neighbours[n] == CellTrace[t]){
  //         neighbours.splice(n);
  //     }
  //   }
  // }

  return neighbours;
}



function MakeEmptyBoard(gridsize) {
  let cells = []
  for (var r = 0; r < gridsize; r++) {
    cells.push([]);
    for (var c = 0; c < gridsize; c++) {
      cells[r][c] = new Cell(r, c);
    }
  }
  return cells;
}

function MakeLines() {
  for (let i = 0; i < CellTrace.length - 1; i++) {
    stroke(200, 0, 0);
    strokeWeight(16);
    line(
      CellTrace[i].x * w + (w / 2),
      CellTrace[i].y * w + (w / 2),
      CellTrace[i + 1].x * w + (w / 2),
      CellTrace[i + 1].y * w + (w / 2));
  }
}

function DrawCells() {
  for (var r = 0; r < gridSize; r++) {
    for (var c = 0; c < gridSize; c++) {
      fill(256);
      strokeWeight(2);
      stroke(0);
      rect(w * Cells[r][c].y, w * Cells[r][c].x, w - off, w - off);
    }
  }
}