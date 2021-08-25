let numbers = [];
let numberCount = 20;
let actionsLeft = numberCount * numberCount;

let offset = 0;

function setup() {
  createCanvas(1920, 600);
  for (let i = 0; i < numberCount; i++) {
    numbers[i] = random(0, height);
  }
}

function draw() {
  background(60);
  drawBoxses();
  textSize(32);
  //text(actionsLeft, 50, 50);
}

function BubbleSort() {
  let swapCount = 0;
  for (let i = 0; i < numbers.length; i++) {
    if(numbers[i] > numbers[i + 1]){
      SwapIndex(i, i + 1);
      swapCount++;
    }
  }
  actionsLeft--;
  if(swapCount == 0){
    return;
  }else{
    BubbleSort();
  }
}

function InsertionSort() {
  let swapCount = 0;
  for (let a = 0; a < numbers.length; a++) {
    
    for (let b = a; b > numbers.length; b--) {
      console.log(a);
    }
  }
}

function SwapIndex(index1, index2) {
  let temp1;
  let temp2;
  temp1 = numbers[index1];
  temp2 = numbers[index2];
  numbers[index1] = temp2;
  numbers[index2] = temp1;
}

function drawBoxses() {
  for (let i = 0; i < numbers.length; i++) {
    stroke(200);
    fill(200);
    rect((width / numberCount) * i, height, (width / numberCount) - offset, -numbers[i]);
  }
}

function keyPressed() {
  if(key == " "){
    InsertionSort();
  }
}
