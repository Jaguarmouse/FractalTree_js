let tree;

function setup() {
  createCanvas(400,400);

  tree = new Tree(width * 0.5, height);

  console.log(tree);
}

function mousePressed() {
  tree.grow();
}

function draw() {
  background(51);

  tree.show();
}


