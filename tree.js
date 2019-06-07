function Tree(x,y) {
  this.x = x;
  this.y = y;
  this.root = new Branch(x, y, x, y-100);
  this.branches = [this.root];
}

Tree.prototype.show = function() {
  for (branch of this.branches) {
    branch.show();
  }
}

Tree.prototype.grow = function() {
  for (let i = this.branches.length - 1; i >= 0; i--) {
    if (this.branches[i].hasChildren) {
      continue;
    }
    this.branches.push(...this.branches[i].branch());
    this.branches[i].hasChildren = true;
  }
}
