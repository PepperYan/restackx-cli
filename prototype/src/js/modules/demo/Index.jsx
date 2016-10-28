import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {incrementAsync,watchIncrementAsync} from './testSaga'
import "./test.less"

class Index extends Component {

	componentDidMount(){
		console.log("gen start");
	}

	onClick(){
		// console.log(this.gen.next());

		this.props.dispatch({type:"INCREMENT_ASYNC"})
	}

	render() {
		return (
			<div onClick={this.onClick.bind(this)}>我是index{this.props.increment}</div>
		);
	}
}

Index.propTypes = {};

function mapStateToProps(state) {
	return {
		increment: state.increment
	};
}

export default connect(mapStateToProps)(withRouter(Index))
