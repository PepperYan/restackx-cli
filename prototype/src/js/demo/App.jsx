import React, { Component } from 'react'

import PropTypes from 'prop-types'
import _ from 'lodash'

export default class App extends Component {

	static propTypes ={

	}

	onClickMenu(e) {
	}

	render() {

		return (
			<div>
				<ul>
					<li><a href="javascript:void(0)" onClick={this.onClickMenu.bind(this)} data-link="/"><i
						className="fa fa-book"></i> <span>Index</span></a></li>
					<li><a href="javascript:void(0)" onClick={this.onClickMenu.bind(this)} data-link="/pagetwo"><i
						className="fa fa-book"></i> <span>Page2</span></a></li>
				</ul>
				<div className="content-wrapper" style={{minHeight: 916}}>
					<section className="content">
						{this.props.children}
					</section>
				</div>
				</div>
		)
	}
}
