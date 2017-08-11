import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {withRouter} from 'react-router'
import {inject} from 'restackx-core'
import {observer} from 'mobx-react'

@withRouter
@inject()
@observer
export default class Page1 extends Component {

  static propTypes = {

  }

  jump = () => {

    this.props.history.push('/pagetwo')
  }

  onClick(){
    this.props.todos.addTodo("hell");
  }

  onClick2(){
    this.props.todos.changeTodo("yeah",1);
  }

	render() {
    const {todos} = this.props.todos ||[]
		return (
			<div>
        <ul>
          <button onClick={this.jump.bind(this)}>jump1</button>
          <button onClick={this.onClick.bind(this)}>a</button>
          <button onClick={this.onClick2.bind(this)}>b</button>
          { this.props.todos && todos.map(function(item,index){
            return <li key={index}>{item}</li>
          })}
        </ul>
			</div>
		)
	}


}
