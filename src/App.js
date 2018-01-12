import React, { Component } from 'react';
import Home from './Home';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href='https://dribbble.com/oauth/authorize?client_id=204bbb5cd76683111d4c9a5d71c76f8ebca37a1ecc62255c92e1e189353bf5fe&scope=public'>LOGIN</a>
        <Route exact path='/zup-shots' component={Home}/>
      </div>
    );
  }
}

export default App;
