import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {incrementAsync,watchIncrementAsync} from './testSaga'
import mobiscroll from "mobiscroll"
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
			<div>
				<mobiscroll.Time
	          ref="time"
						headerText={false}                    // More info about headerText: https://docs.mobiscroll.com/3-0-0_beta6/react/datetime#!opt-headerText
	          maxWidth={90}                         // More info about maxWidth: https://docs.mobiscroll.com/3-0-0_beta6/react/datetime#!opt-maxWidth
	          placeholder="Please Select..."
	      />
				<div onClick={this.onClick.bind(this)}>我是index{this.props.increment }</div>

			</div>
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
