import React, { Component } from 'react';
import AnotherClass from '../../components/AnotherClass';
import TiltCard from '../../components/TiltCard';
import ParticleOne from '../../components/ParticleOne';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <TiltCard /> */}
        <ParticleOne />
        {/* <AnotherClass /> */}
      </div>
    );
  }
}

export default App;
