import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {getPlatform} from '../utils/helper'

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {platformOverride: this.props.location.query.platformOverride}
	}



	componentWillReceiveProps(newProps){
		var newPlatformOverride = newProps.location.query.platformOverride;
		if (newPlatformOverride) {
			if (newPlatformOverride !== this.state.platformOverride) {
				this.setState({platformOverride: newPlatformOverride});
			}
		}
	}

	render() {
		var platform = getPlatform(this.state.platformOverride);

		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {};

function mapStateToProps(state) {
	return {};
}

function mapDispatcherToProps(dispatch) {
	return {   //redux示例 action映射
	}
}

export default connect(mapStateToProps, mapDispatcherToProps)(withRouter(App))
