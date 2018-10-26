import React, { Component } from 'react';
import brain from 'brain.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.network = new brain.NeuralNetwork();
    this.network.train([
      { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
      { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
      { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
      { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
      { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
      { input: {r: 1, g: 0.99, b: 0}, output: { light: 1 } },
      { input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } }
    ]);

    this.state = {
      pickedColor: '#DDDDDD',
      isLight: true,
    }
  }

  getRgb = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16)/255,
        g: parseInt(result[2], 16)/255,
        b: parseInt(result[3], 16)/255
    } : null;
  }

  handleColorChange = (e) => {
    const rgb = this.getRgb(e.target.value);
    const result = brain.likely(rgb, this.network);
    console.log(rgb, result);

    this.setState({
      pickedColor: e.target.value,
      isLight: (result==='light')
    });
  }

  render() {
    const {pickedColor, isLight} = this.state;
    return (
      <div className="container">
        <div className="name">AI brain for picking text color</div>
        <input
          id="color-picker"
          type="color"
          value={pickedColor}
          onChange={this.handleColorChange}
        />
        <div className="color-container" style={{ backgroundColor: pickedColor }}>
          <div id="color-box" style={{ color: isLight ? '#000' : '#FFF' }}>Example Text</div>
        </div>
      </div>
    );
  }
}

export default App;
