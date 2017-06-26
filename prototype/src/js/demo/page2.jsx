import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from 'restackx-core'
import _ from 'lodash'
import {observer} from 'mobx-react'

@observer
class PageTwo extends BaseComponent {


	render() {

		return (
			<div>
				{ this.context.store && this.context.store.todos.todos.map(function(item,index){
					return <li key={index}>{item}</li>
				})}
			</div>
		)
	}
}

PageTwo.propTypes = {};


export default PageTwo
