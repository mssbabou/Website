let influence = 1;

let box1 = new Box(200, 200, 10, 0);

class Box{
  constructor(x, y, size, velocity){
    this.position = new p5.Vector(x, y);
    this.velocity = velocity;
    this.size = size;
    this.mass = size * 0.1;
    this.force = this.velocity * this.mass;
  }
}

function setup() {
  createCanvas(600, 600);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {  
      set(x, y, dist(x, y, width/2, height/2) * influence);
    }   
  }
  updatePixels();
}

function draw() {

}

function CheckCollsion() {
  
}