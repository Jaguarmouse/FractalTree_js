function Branch(ax, ay, bx, by) {
  this.begin = createVector(ax, ay);
  this.end = createVector(bx, by);
  this.hasChildren = false;
  this.tilt = PI/6;
}

Branch.prototype.show = function() {
  stroke(255);
  line(this.begin.x, this.begin.y, this.end.x, this.end.y);
}

Branch.prototype.branch = function() {
  const dir = p5.Vector.sub(this.end, this.begin);
  dir.mult(0.67);
  dir.rotate(this.tilt);
  const newRight = p5.Vector.add(this.end, dir);
  dir.rotate(-2 * this.tilt);
  const newLeft = p5.Vector.add(this.end, dir);

  const right = new Branch(this.end.x, this.end.y, newRight.x, newRight.y);
  const left = new Branch(this.end.x, this.end.y, newLeft.x, newLeft.y);
  
  console.log(right);
  console.log(left);
  return [right, left];
}
