import React, { Component } from 'react';
import './App.css';
import { Route} from 'react-router-dom';
import EnterColor from './components/EnterColor';
import Palette from './components/Palette';
var hexToHsl = require('hex-to-hsl');

class App extends Component {

  state = {
    colors: ["#7683da", "#ad764f", "#4fc7bd"],
    hslColors: [],
    colorInput : '',
    isValidHex: false,
    showError: false
  }

  updateHSLValues = () => {
    this.setState({
      hslColors: []
    });
    this.state.colors.map(color => {
      let [,saturation, luminiosity] = hexToHsl(color);
      return this.setState((state) => {
        return {
          hslColors: [
            ...state.hslColors,
            {
              luminiosity,
              saturation
            }
          ]
        }
      })
    })
  }

  getRandomHue = () => {
    return Math.ceil(Math.random() * 360);
  }

  handleInput = (value) => {
    this.setState({
      colorInput: value
    })
    const regex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
    if (regex.test(value)) {
      this.setState({
        isValidHex: true,
        showError: false
      })
    } else {
      this.setState({
        isValidHex: false,
        showError: false
      })
    }
  }

  handleSubmission = (e) => {
    e.preventDefault();
    if (this.state.isValidHex) {
      this.setState({
        colors: [
          ...this.state.colors,
          this.state.colorInput
        ],
        colorInput: '',
        showError: false
      });
    } else {
      this.setState({
        showError: true
      })
    }
  }

  handleDelete = (indexToRemove) => {
    this.setState({
      colors: this.state.colors.filter((color, index) => {
        return index !== indexToRemove;
      })
    })
  }


  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <EnterColor
        colors={this.state.colors}
        handleInput={this.handleInput}
        inputValue={this.state.colorInput}
        formSubmission={this.handleSubmission}
        showError={this.state.showError}
        handleDelete={this.handleDelete}
        />}/>
        <Route path="/palette" render={() =>  <Palette
        loadHSL={this.updateHSLValues}
        hue={this.getRandomHue}
        hslColors={this.state.hslColors} /> }/>
      </div>
    );
  }
}

export default App;
