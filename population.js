function Population() {
  this.trees = [] 
  this.genes = [];

  this.next = [];

  this.len = 60;

  for (let i = 0; i < popNum; i++) {
    const gene = new Gene(depth);
    const tree = new Tree(this.len, gene.angles);

    this.trees[i] = tree;
    this.genes[i] = gene;
  }
}


Population.prototype.show = function() {
  background(51);

  push();
  const gap = width / 4;
  translate(gap*0.5, height);
  for (let i = 0; i < 4; i++) {
    this.trees[i].show();
    translate(gap, 0);
  }
  pop();
}

Population.prototype.step = function() {
  this.trees.forEach(tree => tree.grow());
}

Population.prototype.nextGen = function() {
  this.select();
  this.uniformCrossover();

  for (gene of this.next) {
    if (random() < mutationRate) {
      continue;
    }
    gene.mutate();
  }
  this.reset(this.next.slice());
  this.next = [];
}

Population.prototype.eval = function() {
  const heights = this.trees.map(tree => tree.height());
  for (let i = 0; i < popNum; i++) {
    for (let j = popNum - 1; j >= i + 1; j--) {
      if (heights[j-1] < heights[j]) {
        const tree = this.trees[j];
        this.trees[j] = this.trees[j-1];
        this.trees[j-1] = tree;

        const gene = this.genes[j];
        this.genes[j] = this.genes[j-1];
        this.genes[j-1] = gene;

        const height = heights[j];
        heights[j] = height;
        heights[j-1] = height;
      }
    }
  }

  heights.forEach((h, i) => heights[i] = pow(h, 1.2));
  return heights;
}

Population.prototype.select = function() {
  const evals = this.eval();

  console.log(this.trees.map(tree => tree.height()));

  for (let i = 0; i < eliteNum; i++) {
    this.next[i] = this.genes[i];
  }

  const sum = evals.reduce((a, c) => a + c, 0);
  while (this.next.length < popNum) {
    let p = 0;
    const roulette = random(sum);
    for (let i = 0; i < popNum; i++) {
      p += evals[i];
      if (p > roulette) {
        this.next.push(this.genes[i]);
        break;
      }
    }
  }
}

Population.prototype.crossover = function() {
  for (let i = 0; i < this.next.length; i += 2) {
    if (random() > 0.9) {
      continue;
    }
    const {ip1, ip2} = this.next[i].randomIndexPath();

    const child1 = this.next[i].angles.slice();
    const child2 = this.next[i+1].angles.slice();
    for (let j = ip1.index; j < ip2.index; j++) {
      child1[j] = this.next[i+1].angles[j];
      child2[j] = this.next[i].angles[j];
    }
    
    this.next[i].angles = child1;
    this.next[i+1].angles = child2;
  }
}

Population.prototype.uniformCrossover = function() {
  for (let i = 0; i < this.next.length; i += 2) {
    if (random() > 0.9) {
      continue;
    }
    
    for (let j = 0; j < this.next[i].angles.length; j++) {
      if (random() < 0.5) {
        const tmp = this.next[i].angles[j].r;
        this.next[i].angles[j].r = this.next[i+1].angles[j].r;
        this.next[i+1].angles[j].r = tmp;
      }
      if (random() < 0.5) {
        const tmp = this.next[i].angles[j].l;
        this.next[i].angles[j].l = this.next[i+1].angles[j].l;
        this.next[i+1].angles[j].l = tmp;
      }
    }
  }
}

Population.prototype.reset = function(nextGenes) {
  for (let i = 0; i < popNum; i++) {
    const tree = new Tree(this.len, nextGenes[i].angles);
    this.trees[i] = tree;
  }
  this.genes = nextGenes;
}
