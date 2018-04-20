import React, { Component } from 'react';
import './App.css';
import Calculator from "./components/Calculator";

class App extends Component {
  render() {
    return (
      <div className="App">
          <header>
            <h1>React Calculator</h1>
          </header>
        <Calculator/>
      </div>
    );
  }
}

export default App;
