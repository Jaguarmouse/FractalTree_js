const depth = 7;
const popNum = 200;
const maxGen = 100;
const eliteNum = 2;
const mutationRate = 0.001;

let time = 0;
let gen = 0;

let population;

function setup() {
  createCanvas(600,400);

  population = new Population();

  population.show();
}

function draw() {
  step();
}

function mousePressed() {
//  step();
}

function step() {
  if (time + 1 < depth) {
    population.step();
    population.show();
    time++;
  } else if (gen < maxGen){

    console.log(`generation ${gen} finished!`);
//    console.log(`Best Height: ${population.trees[0].height()}!`);

    population.nextGen();

    gen++;
    time = 0;
  } else {
    console.log("finish");
    noLoop();
  }
}
