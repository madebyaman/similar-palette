import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './EnterColor.css'

export default class EnterColor extends Component {

  render() {
    return (
      <div className="color-input">
      <h1>Similar Palette</h1>
        <form onSubmit={this.props.formSubmission}>
          <input autoComplete="off" onChange={e => this.props.handleInput(e.target.value)} value={this.props.inputValue} type="text" name="color" placeholder="#ffffff" />
          <p className="error">{(this.props.showError) ? 'Place enter a 6-digit HEX code starting with #' : ''}</p>
        </form>
        <h2>Colors Entered</h2>
        <ReactCSSTransitionGroup
          component="ul"
          transitionName="slide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={800}
          className="color-entered"
        >
          {this.props.colors.map((color, index) => <li className='color-tile' key={index} style={{ backgroundColor: color }}>
            <span className="hexValue">{color}</span>
            <div className="delete" onClick={() => this.props.handleDelete(index)}><span>Delete</span></div>
          </li>)}
        </ReactCSSTransitionGroup>
        <Link to='/palette' className={(this.props.colors.length === 0) ? 'palette-button not-active' : 'palette-button active'}>Show Palette</Link>
      </div>
    )
  }
}