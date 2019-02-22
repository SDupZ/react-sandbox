import React from 'react';

import './styles.css';

const X_ROTATION_FACTOR = 0.1;
const Y_ROTATION_FACTOR = -0.1;
const SCALE_FACTOR = 1.1;

export default class TiltCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xRotation: 0,
      yRotation: 0,
      scaleFactor: 1,
    };

    this.containerRef = React.createRef();
  }

  handleMouseMove = (e) => {
    if (this.containerRef && this.containerRef.current) {
      const boundingRect = this.containerRef.current.getBoundingClientRect();

      // x distance from center
      const rawXOffset = e.clientX - (boundingRect.x + (boundingRect.width / 2));
      const rawYOffset = e.clientY - (boundingRect.y + (boundingRect.height / 2));

      this.setState({ 
        xRotation: rawYOffset * X_ROTATION_FACTOR,
        yRotation: rawXOffset * Y_ROTATION_FACTOR,
        scaleFactor: SCALE_FACTOR,
      })
    }
  }

  handleMouseLeave = (e) => {
    this.setState({
      xRotation: 0,
      yRotation: 0,
      scaleFactor: 1,
    })
  }

  render() {
    const { xRotation, yRotation, scaleFactor } = this.state;
    return (
      <div
        ref={this.containerRef}
        className="container"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        style={{ transform: `perspective(50em) rotateX(${xRotation}deg) rotateY(${yRotation}deg)  scale(${scaleFactor})` }}
      >
        <div className="imageContainer" />
      </div>
    );
  }
}