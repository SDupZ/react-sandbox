import React, { Component } from 'react';
import TiltCard from './components/TiltCard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TiltCard />
        </header>
      </div>
    );
  }
}

export default App;
