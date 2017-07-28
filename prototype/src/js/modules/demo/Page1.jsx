import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {withRouter} from 'react-router'
import {BaseComponent} from 'restackx-core'
import {observer} from 'mobx-react'

@withRouter
@observer
export default class Page1 extends BaseComponent {

  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.any
  }

  static propTypes = {

  }

  componentWillReceiveProps(nextProps){
    console.log("next");
    console.log(nextProps)
  }

  componentWillMount(){
  }

  jump = () => {

    this.props.history.push('/pagetwo')
  }

  onClick(){
    this.context.store.todos.addTodo("hell");
  }

  onClick2(){
    this.context.store.todos.changeTodo("yeah",1);
  }

	render() {
    // const todos = this.props.store? this.props.store.todos:[];
    const {todos} = this.context.store
		return (
			<div>
        <ul>
          <button onClick={this.jump.bind(this)}>jump1</button>
          <button onClick={this.onClick.bind(this)}>a</button>
          <button onClick={this.onClick2.bind(this)}>b</button>
          { this.context.store && todos.todos.map(function(item,index){
            return <li key={index}>{item}</li>
          })}
        </ul>
			</div>
		)
	}


}
