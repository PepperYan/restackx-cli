import React, {Component, PropTypes} from 'react'
import {withRouter} from 'react-router'

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
