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
			<button onClick={this.add}>add</button> {this.props.crud.isFetching? "fetching" : "done"}
			</div>
		);
	}

	add = () => {
		let nextState = this.props.crud.isFetching? false : true;
		console.log(nextState)
		this.props.dispatch({
			type:"crud/list",
			payload: {
				isFetching: nextState,
			}
		})
	}
}

Index.propTypes = {};

function mapStateToProps(state) {
	return {
		crud: state.crud || {}
	};
}

export default connect(mapStateToProps)(withRouter(Index))
