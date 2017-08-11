import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {inject} from 'restackx-core'
import _ from 'lodash'
import {observer} from 'mobx-react'

@inject()
@observer
class PageTwo extends BaseComponent {

	render() {

		return (
			<div>
				page2
				{ this.props.todos && this.todos.todos.map(function(item,index){
					return <li key={index}>{item}</li>
				})}
			</div>
		)
	}
}

PageTwo.propTypes = {};


export default PageTwo
