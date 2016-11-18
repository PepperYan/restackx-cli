import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

@connect(
	state => {
		return {
		}
	}
)
@withRouter
export default class App extends Component {

	static propTypes = {

	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
