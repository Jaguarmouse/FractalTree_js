function Gene(depth) {
  this.depth = depth;
  this.angles = [];
  
  for (let i = 0; i < depth; i++) {
    for (let j = 0; j < pow(2, i); j++) {
      this.angles.push({
        r: random(0, TWO_PI),
        l: random(0, TWO_PI)
      });
    }
  }
}

Gene.prototype.mutate = function() {
  const index = floor(random(this.angles.length))
  const a = Object.assign({}, this.angles[index]);
  if (random() > 0.5) {
    a.r = random(0, TWO_PI);
  } else {
    a.l = random(0, TWO_PI);
  }
  this.angles[index] = a;
}

Gene.prototype.randomIndexPath = function() {
  const i1 = floor(random(this.angles.length));
  const i2 = i1 + floor(random(this.angles.length - i1))

  const ip1 = { index: i1, path: floor(random(2)) > 0 ? 'r' : 'l' }
  const ip2 = { index: i2, path: floor(random(2)) > 0 ? 'r' : 'l' }

  return {ip1, ip2};
}


