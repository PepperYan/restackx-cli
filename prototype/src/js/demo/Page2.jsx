import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {observer,inject} from 'mobx-react'

@inject("todos")
@observer
class PageTwo extends Component {

	render() {
		return (
			<div>
				page2
				{ this.props.todos && this.props.todos.todos.map(function(item,index){
					return <li key={index}>{item}</li>
				})}
			</div>
		)
	}
}

PageTwo.propTypes = {};


export default PageTwo
