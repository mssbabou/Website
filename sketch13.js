let startingNum = 8400511;
let Numbers = [8400511];

let offset = 1;
let pinWidth;
let pinHeight;

function setup() {
  createCanvas(1800, 900);
  background(60); 
  CalcLargestSeq(99,999,999);
  //Calc();
  CalcPin();
}

function draw() {

}

function CalcPin() {
  let pinWidth = width / (Numbers.length + offset);
  let pinHeight = (height - 10)/ FindLargest(Numbers);

  for (let i = 0; i < Numbers.length; i++) {
    stroke(200);
    line((pinWidth + offset) * i, 
    height - (Numbers[i] * pinHeight), 
    (pinWidth + offset) * (i+1), 
    height - (Numbers[i+1] * pinHeight));
  }
  for (let i = 0; i < Numbers.length; i++) {
    stroke(0);
    fill(255);
    circle((pinWidth + offset) * i, height - (Numbers[i] * pinHeight), 10);
    //rect((pinWidth + offset) * i, height, pinWidth, -Numbers[i] * pinHeight);
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function FindLargest(array) {
  let largest = 0;
  for (let i = 0; i < array.length; i++) {
    if(array[i] > largest){
      largest = array[i];
    }
  }
  return largest;
}

function CalcLargestSeq(iterations){
  let longest = [];

  for (let i = 1; i <= iterations; i++) {
    Numbers = [];
    Numbers[0] = i;
    Calc();

    if(Numbers.length > longest.length){
      longest = Numbers;
    }
  }

  console.log("Longest Sequence " + longest.length + " With Number " + numberWithCommas(longest[0]));
  console.log("Largest Number " + numberWithCommas(FindLargest(longest)));
}

function Calc() {
  if(Numbers[Numbers.length - 1] == 1){
    return;
  }
  if((Numbers[Numbers.length - 1] % 2) == 0){
    Numbers.push(Numbers[Numbers.length - 1] / 2);
    Calc();
  }else if((Numbers[Numbers.length - 1] % 2) == 1){
    Numbers.push(Numbers[Numbers.length - 1] * 3 + 1);
    Calc();
  }
}