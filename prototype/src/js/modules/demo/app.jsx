import React, { Component } from 'react'

import PropTypes from 'prop-types'
import _ from 'lodash'
// var HeaderBar = require('../../components/ui/framework/header-bar/header-bar');
// var NavBar = require('../../components/ui/framework/header-bar/header-navbar');
// import SiderBar from '../../components/ui/framework/sider-bar'


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
