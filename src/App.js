import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom'
import cookie from 'react-cookies';

import Auth from './Auth';
import Shots from './Shots';


class App extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

  }

  logout(){
    cookie.remove('access_token', { path: '/' });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>ZUP SHOTS</h2>
          {cookie.load('access_token') ? (
            'VOCÊ JÁ ESTA AUTENTICADO NO DRIBBBLE'
          ) : (
            'VOCÊ NÃO ESTA AUTENTICADO NO DRIBBBLE, FAÇA O LOGIN'
          )}
        </div>
        <div>
        <br />
        <a href='https://dribbble.com/oauth/authorize?client_id=204bbb5cd76683111d4c9a5d71c76f8ebca37a1ecc62255c92e1e189353bf5fe&scope=public&redirect_uri=http://localhost:3000/zup-shots'>LOGIN</a>
        <span>  | </span>
        <a href="/zup-shots" onClick={() => this.logout()}>LOGOUT</a>
        </div>
        <div className="App-content">
          <Route path='/zup-shots' component={Auth}/>
          <Route path='/zup-shots/shots' component={Shots}/>
        </div>
      </div>
    );
  }

} export default App;
