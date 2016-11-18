import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import mobiscroll from "mobiscroll"

@connect(
	state => {
		return {
		}
	}
)
@withRouter
export default class Next extends Component {

  static propTypes = {

  }

	render() {
		return (
			<div>
        Next
			</div>
		);
	}

}
