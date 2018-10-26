import React, { Component } from 'react';
import brain from 'brain.js';
import { ChromePicker } from 'react-color';
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
      { input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } },
      { input: {r: 0.6, g: 0.42, b: 1}, output: { dark: 1 } },
    ]);

    this.state = {
      pickedColor: '#DDDDDD',
      isLight: true,
    }
  }

  handleColor = (color, event) => {

    const rgb = {
      r: color.rgb.r/255,
      g: color.rgb.g/255,
      b: color.rgb.b/255
    };
    const result = brain.likely(rgb, this.network);

    this.setState({
      pickedColor: color.hex,
      isLight: (result==='light')
    });
  }

  render() {
    const {pickedColor, isLight} = this.state;
    return (
      <div className="container" style={{ backgroundColor: pickedColor }}>
        <ChromePicker
          disableAlpha
          color={pickedColor}
          className="colorPicker"
          onChange={this.handleColor}
        />
        <div className="title" style={{ color: isLight ? '#000' : '#FFF' }}>
          <strong style={{fontSize: 58}}>AI</strong> For Picking This Text Color
          <div className="description">
            It determines if the picked color is dark
            and makes the text black or white accordingly.
          </div>
        </div>
      </div>
    );
  }
}

export default App;
