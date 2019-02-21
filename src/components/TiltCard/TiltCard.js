import React from 'react';

import './styles.css';

export default class TiltCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xRotation: 0,
      yRotation: 0,
    };

    this.containerRef = React.createRef();
  }

  handleMouseMove = (e) => {
    if (this.containerRef && this.containerRef.current) {
      const boundingRect = this.containerRef.current.getBoundingClientRect();

      // x distance from center
      const rawXOffset = e.clientX - (boundingRect.x + (boundingRect.width / 2));
      const rawYOffset = e.clientY - (boundingRect.y + (boundingRect.height / 2));

      const xScaleFactor = -0.1;
      const yScaleFactor = 0.1;

      this.setState({ 
        xRotation: rawYOffset * xScaleFactor,
        yRotation: rawXOffset * yScaleFactor,
      })
    }
  }

  handleMouseLeave = (e) => {
    this.setState({
      xRotation: 0,
      yRotation: 0,
    })
  }

  render() {
    const { xRotation, yRotation } = this.state;
    return (
      <div
        ref={this.containerRef}
        className="container"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        style={{ transform: `perspective(50em) rotateX(${xRotation}deg) rotateY(${yRotation}deg)` }}
      >
        <div className="imageContainer" style={{ backgroundImage: 'url(https://www.planwallpaper.com/static/images/HD-Scenery-Wallpapers-1.jpg)'}} />
      </div>
    );
  }
}