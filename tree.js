function Tree(len, angles) {
  this.root = new Branch(0, 0, 0, -len);
  this.branches = [this.root];
  this.angles = angles;
}

Tree.prototype.show = function() {
  for (branch of this.branches) {
    branch.show();
  }
}

Tree.prototype.leaves = function() {
  return this.branches.filter(branch => branch.leaf);
}

Tree.prototype.grow = function() {
  for (let i = this.branches.length - 1; i >= 0; i--) {
    if (!this.branches[i].leaf) {
      continue;
    }
    const ra = this.angles[i].r;
    const la = this.angles[i].l;
    const children = this.branches[i].branch(ra, la);
    this.branches.push(...children);
  }
}

Tree.prototype.height = function() {
  const leaves = this.leaves();
  const sum = leaves.reduce((p,c) => p + height - c.end.y, 0);
  return sum / leaves.length;
}

Tree.prototype.area = function() {
  const leaves = this.leaves();
  const range = leaves.reduce((accum, c) => {
    accum.min = accum.min > c.end.x ? c.end.x : accum.min;
    accum.max = accum.max < c.end.x ? c.end.x : accum.max;
    return accum;
  }, {min: Number.MAX_VALUE, max: 0});

  return range.max - range.min;
}

