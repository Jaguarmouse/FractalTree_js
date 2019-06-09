function Branch(ax, ay, bx, by) {
  this.begin = createVector(ax, ay);
  this.end = createVector(bx, by);
  this.leaf = true;
}

Branch.prototype.show = function() {
  if (this.leaf) {
    stroke(0, 255, 0);
  } else {
    stroke(255);
  }
  line(this.begin.x, this.begin.y, this.end.x, this.end.y);
}

Branch.prototype.branch = function(ra, la) {
  const dir = p5.Vector.sub(this.end, this.begin);
  dir.mult(0.67);
  dir.rotate(ra);
  const newRight = p5.Vector.add(this.end, dir);
  dir.rotate(-ra - la);
  const newLeft = p5.Vector.add(this.end, dir);

  const right = new Branch(this.end.x, this.end.y, newRight.x, newRight.y);
  const left = new Branch(this.end.x, this.end.y, newLeft.x, newLeft.y);
  
  this.leaf = false;
  return [right, left];
}
