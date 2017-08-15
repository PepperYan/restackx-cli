import React, { Component } from 'react'
// import LogoImg from './logo.png'
import LogoWithTitileImg from './restack-logo.png'
import './home.less'

export default class App extends Component {

  render() {

    return (
      <div className="home">
        <img className="logo" src={LogoWithTitileImg}/>
        <div className="helloworld">
          <h1>Welcome to Restackx for React</h1>
          Let's begin in <code>src/App.jsx</code>, change the <i>world</i>.
        </div>
      </div>
    )
  }
}
