import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router-dom';
import './Palette.css';

export default class Palette extends Component {

  componentDidMount() {
    this.props.loadHSL();
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 32) {
        this.renderAgain();
      }
    })
  }

  renderAgain = () => {
    this.forceUpdate();
  }

  displayLi = (color, index) => {
    return (<li className="color" key={index} style={{
      backgroundColor: `hsl(${this.props.hue()}, ${color.saturation}%, ${color.luminiosity}%)`
    }}><span>{`HSL(${this.props.hue()}, ${color.saturation}%, ${color.luminiosity}%)`}</span></li>);
  }

  render() {
    return (
      <div className="matching-palette">
        <header>
          <Link to="/" className="nav-link">&larr; Back to home</Link>
          <h1>Similar Color Palette</h1>
        </header>
        <ReactCSSTransitionGroup
          component="ul"
          transitionName="slide"
          transitionEnter={false}
          transitionLeave={false}
          transitionAppear={true}
          transitionAppearTimeout={800}
          className="colors"
        >
          {
            this.props.hslColors.map((item, id) => this.displayLi(item, id)
          )}
        </ReactCSSTransitionGroup>
          <div className="info"><h3>Load more colors</h3><p>Hit space key in your keyboard to load more colors</p><a className="skip" onClick={
          (e) => {e.target.closest('.info').remove()}
          }>Done</a>
          </div>
      </div>
    )
  }
}