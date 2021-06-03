let arm_Length = 50;
let arm_width = 2;
let distance_Center = 30;

let color;

let center = false;

function setup() {
  createCanvas(600, 600);
  slider_Length = createSlider(0, 200, 50);
  slider_Width = createSlider(0, 200, 2);
  slider_Distance = createSlider(0, 200, 30);
  slider_color = createSlider(0, 255, 0);
  slider_color.style('width', '200px');

  slider_Center = createCheckbox('Center', false);
  slider_Center.changed(myCheckedEvent);

  colorMode(HSB, 255);
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

function myCheckedEvent() {
  if (this.checked()) {
    center = false;
  } else {
    center = true;
  }
}