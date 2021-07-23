let arm_Length = 50;
let arm_width = 2;
let distance_Center = 30;

let color;

let center = true;

let SavedCrosshairs = [];

class SavedCrosshair{
  constructor(length, width, distance, color, center){
    this.length = length;
    this.width = width;
    this.distance = distance;
    this.color = color;
    this.center = center;
  }
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 255);
  slider_Length = createSlider(0, 400, 50);
  slider_Width = createSlider(0, 400, 2);
  slider_Distance = createSlider(0, 400, 30);
  slider_color = createSlider(0, 250, 0);

  slider_Center = createCheckbox('Center', false);
  slider_Center.mousePressed(CheckedEvent);

  save_button = createButton('Save');
  save_button.mousePressed(SaveState);
  save_button.size(200, AUTO);

  load_button = createButton('Load');
  load_button.position(width + 20, 20);
  load_button.size(100, AUTO);
}

function draw() {
  arm_Length = slider_Length.value();
  arm_width = slider_Width.value();
  distance_Center = slider_Distance.value();
  color = slider_color.value();
  background(60);
  stroke(color, 255, 255);
  fill(color, 255, 255);
  // RIGHT
  rect(
    (width / 2) + distance_Center, 
    (height / 2) - arm_width / 2, 
    arm_Length, 
    arm_width
    );
  // LEFT
  rect(
    (width / 2) - distance_Center - arm_Length, 
    (height / 2) - arm_width / 2, 
    arm_Length, 
    arm_width
    );
  // DOWN
  rect(
    (width / 2) - arm_width / 2, 
    (height / 2) + distance_Center, 
    arm_width, 
    arm_Length
    );
  // TOP
  rect(
    (width / 2) - arm_width / 2, 
    (height / 2) - distance_Center - arm_Length, 
    arm_width, 
    arm_Length
    );

    if(center == false){
      rect(
        width / 2 - arm_width / 2, 
        height / 2 - arm_width / 2, 
        arm_width, 
        arm_width
        );
    }
}

function CheckedEvent() {
  if (this.checked()) {
    center = true;
  } else {
    center = false;
  }
}

function SaveState() {
  SavedCrosshairs.push(new SavedCrosshair(
    arm_Length, 
    arm_width, 
    distance_Center, 
    color, 
    center
    ));
  console.log(SavedCrosshairs);
}
