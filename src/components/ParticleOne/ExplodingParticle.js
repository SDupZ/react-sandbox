export default class ExplodingParticle {
  constructor(
    animationDuration = 1000,
    speed = {
      x: -5 + Math.random() * 10,
      y: -5 + Math.random() * 10
    },
    radius = 5 + Math.random() * 5,
    life = 30 + Math.random() * 10,
  ) {
    this.animationDuration = animationDuration;
    this.speed = speed;
    this.radius = radius;
    this.life = life;
    this.remainingLife = this.life;

    this.draw = this.draw.bind(this);
  }

  draw(ctx) {
    let p = this;

    if (this.remainingLife > 0
      && this.radius > 0) {

      // Draw a circle at the current location
      ctx.beginPath();
      ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ", 1)";
      ctx.fill();

      // Update the particle's location and life
      p.remainingLife--;
      p.radius -= 0.25;
      p.startX += p.speed.x;
      p.startY += p.speed.y;
    }
  }
}