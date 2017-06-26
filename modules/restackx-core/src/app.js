import React,{Component} from 'react'
import { render } from 'react-dom'
import { Router} from 'react-router'
import {Provider} from './Provider'

export class App extends Component{
  render(){
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          {this.props.routes}
        </Router>
      </Provider>
    )
  }
}
//<IndexRoute component={App}/>
