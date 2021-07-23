let Deck = [];

let Deck_0 = [];
let Deck_1 = [];
let Deck_0_Rest = [];
let Deck_1_Rest = [];

function keyPressed() {
  if(key == " "){
    CheckRules(Deck_0, Deck_1);
  }
}

function setup() {
  createCanvas(600, 600);
  for (let i = 1; i <= 13; i++) {
    for (let y = 0; y < 4; y++) {
      Deck.push(i);
    }
  }
  Deck = RandomArray(Deck);
  SplitArray(Deck);
}

function draw() {
  background(60);
  textSize(32);
  fill(255);
  text(Deck_0.length, 100, 100);
  text(Deck_0_Rest.length, 160, 100);
  text(Deck_1.length, 100, 200);
  text(Deck_1_Rest.length, 160, 200);
  CheckRules(Deck_0, Deck_1);
}

function CheckRules(array0, array1) {
  if(array0[0] == 1 && array1[0] == 13){
    Deck_0_Rest.push(array0[0]);
    Deck_0_Rest.push(array1[0]);
    array0.shift();
    array1.shift();
  }else if(array1[0] == 1 && array0[0] == 13){
    Deck_1_Rest.push(array0[0]);
    Deck_1_Rest.push(array1[0]);
    array0.shift();
    array1.shift();
  }else if (array0[0] > array1[0]){
    Deck_0_Rest.push(array0[0]);
    Deck_0_Rest.push(array1[0]);
    array0.shift();
    array1.shift();
  }else if(array1[0] > array0[0]){
    Deck_1_Rest.push(array0[0]);
    Deck_1_Rest.push(array1[0]);
    array0.shift();
    array1.shift();
  }else if(array0[0] == array1[0]){
    let points = 0;
    console.log("War");
    for (let i = 1; i <= 3; i++) {
      if((array0[i] - array1[i]) > 0){
        points++;
      }else if((array0[i] - array1[i]) < 0){
        points--;
      }else if((array0[i] - array1[i]) == 0){
        // War-seption
        console.log("War-seption");
      }
    }
     if(points < 0){
       for (let i = 0; i < 4; i++) {
         Deck_0_Rest.push(array1[0]);
         array1.shift();
       }
     }else if(points > 0){
      for (let i = 0; i < 4; i++) {
        Deck_1_Rest.push(array0[0]);
        array0.shift();
      }
     }
  }
  Deck_0 = array0;
  Deck_1 = array1;
}

function SplitArray(array) {
  for (let i = 0; i < array.length; i+=2) {
    Deck_0.push(array[i]);
  }
  for (let i = 1; i < array.length; i+=2) {
    Deck_1.push(array[i])
  }
}

function RandomArray(array){
  for (let i = 0; i < array.length; i++) {
    let randonNum = floor(random(0, array.length));
    array = SwapValue(array, i, randonNum);
  }
  return array;
}

function SwapValue(array, index0, index1){
  let value0 = array[index0];
  let value1 = array[index1];

  array[index0] = value1;
  array[index1] = value0;

  return array;
}
