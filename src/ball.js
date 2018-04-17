function Ball(x, y, r, color) {
  this.pos = createVector(x, y);
  this.r = r;
  this.color = color;
  this.vel = createVector(0,0);

  this.update = function() {
    var newVel = createVector(mouseX-width/2, mouseY-height/2);
    // console.log(p5.Vector.mag(newVel));
    // console.log(mouseX + " " + mouseY);
    
    if ((mouseX >= 0 && mouseX <= 600) && (mouseY >= 0 && mouseY <= 600)) {
      if (p5.Vector.mag(newVel) <= 200) {
        newVel.setMag(p5.Vector.mag(newVel) / 66.66);
      } else {
          newVel.setMag(6); //Change to 3 after tests
      }
    } else {
      newVel.setMag(0);
    }

    var boundries = 1000;
    if (playerBall.pos.x - playerBall.r * 0.75 < -boundries && mouseX < 300) {
      newVel.setMag(0);
    } else if (playerBall.pos.x + playerBall.r * 0.75 > boundries && mouseX > 300) {
      newVel.setMag(0);
    } else if (playerBall.pos.y - playerBall.r * 0.75 < -boundries && mouseY < 300) {
      newVel.setMag(0);
    } else if (playerBall.pos.y + playerBall.r * 0.75 > boundries && mouseY > 300) {
      newVel.setMag(0);
    }

    // var enemyVel = (playerBall.pos - enemyBalls.pos);
    // enemyBalls.vel = enemyVel;
    // if (enemyBalls.r > playerBall.r){
    //   enemyBalls.vel.add(enemyBalls);
    // }
    
    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel);

  }

  this.eats = function(other) {
    if (this.r > other.r * 1.1) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r * 0.1) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      this.color = other.color;
      return true;
    } else {
      return false;
      } 
    } else if (this.r * 1.3 < other.r){
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r * 0.1) {
          sum = PI * this.r * this.r + PI * other.r * other.r;
          other.r = sqrt(sum / PI);
          return true;
      } else {
          return false;
      }
    }
  }

  this.show = function() {
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    fill(pickColor(color));
  }
}