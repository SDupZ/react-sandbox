import React from 'react';
import html2canvas from 'html2canvas';

import ExplodingParticle from './ExplodingParticle';
import css from './ParticleOne.module.css';

export default class ParticleOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      particles: []
    };

    this.buttonRef = React.createRef();
    this.containerRef = React.createRef();
    this.canvasRef = React.createRef();

    this.getColorAtPoint = this.getColorAtPoint.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
    this.getCanvasCtx = this.getCanvasCtx.bind(this);
    this.createParticleAtPoint = this.createParticleAtPoint.bind(this);
    this.update = this.update.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
  }

  getCanvas() {
    if (this.canvasRef.current) {
      return this.canvasRef.current;
    }
  }

  getCanvasCtx() {
    if (this.canvasRef.current) {
      return this.canvasRef.current.getContext("2d");
    }
  }

  getColorAtPoint(e) {
    // Get the coordinate of the click
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Get the color data of the canvas version of our element at that location
    let rgbaColorArr = this.ctx.getImageData(x, y, 1, 1).data;

    // Get the button's positioning in terms of the window
    let bcr = this.buttonRef.current.getBoundingClientRect();
    let globalX = bcr.left + x;
    let globalY = bcr.top + y;

    // Create a particle using the color we obtained at the window location
    // that we calculated
    this.createParticleAtPoint(globalX, globalY, rgbaColorArr);
  }

  resizeCanvas() {
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resizeCanvas, false);

    if (this.containerRef.current && this.buttonRef.current) {
      const canvas = await html2canvas(this.buttonRef.current);

      this.ctx = canvas.getContext("2d");
      requestAnimationFrame(this.update);


      this.resizeCanvas();
    }
  }

  createParticleAtPoint(x, y, colorData) {
    let particle = new ExplodingParticle();
    particle.rgbArray = colorData;
    particle.startX = x;
    particle.startY = y;
    particle.startTime = Date.now();

    this.setState(({ particles}) => ({ particles: particles.concat([particle])}));
  }

  update() {
    const { particles } = this.state;
    const particleCtx = this.getCanvasCtx();

    // Clear out the old particles
    if (typeof particleCtx !== "undefined") {
      particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    // Draw all of our particles in their new location
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(particleCtx);

      // Simple way to clean up if the last particle is done animating
      if (i === particles.length - 1) {
        let percent = (Date.now() - particles[i].startTime) / particles[i].animationDuration;

        if (percent > 1) {
          this.setState({ particles: []})
        }
      }
    }

    // Animate performantly
    requestAnimationFrame(this.update);
  }

  render() {
    return (
      <div className={css.container} ref={this.containerRef}>
        <button
          onClick={this.getColorAtPoint}
          className={css.buttonOne}
          ref={this.buttonRef}
        >
          Hello World
        </button>
        <canvas className={css.canvas} ref={this.canvasRef} />
      </div>
    );
  }
}
