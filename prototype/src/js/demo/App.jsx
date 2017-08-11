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
				<div className="content-wrapper" style={{minHeight: 916}}>
					<section className="content">
						{this.props.children}
					</section>
				</div>
				</div>
		)
	}
}
