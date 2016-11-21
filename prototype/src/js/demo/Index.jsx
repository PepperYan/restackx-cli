import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import mobiscroll from "mobiscroll"
import "./assets/test.less"

@connect(
	state => {
		return {
			crud: state.crud || {}
		}
	}
)
@withRouter
export default class Index extends Component {

	static propTypes = {}

	render() {
		return (
			<div>
				<mobiscroll.Time
	          ref="time"
						headerText={false}                    // More info about headerText: https://docs.mobiscroll.com/3-0-0_beta6/react/datetime#!opt-headerText
	          maxWidth={90}                         // More info about maxWidth: https://docs.mobiscroll.com/3-0-0_beta6/react/datetime#!opt-maxWidth
	          placeholder="Please Select..."
	      />
			<br/>
			<button onClick={this.add}>fetch</button>
			{this.props.crud.isFetching? "fetching" : "done"}
			<br/>
			<button onClick={this.nav}>navigation</button>
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

	nav = () => {
		this.props.router.push("/next");
	}
}
