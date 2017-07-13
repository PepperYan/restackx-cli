import React, { Component, PropTypes } from 'react'
import _ from 'lodash'


class SiderBar extends Component{


  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar" style={{height: "auto"}}>
          <div className="user-panel">
            <div className="pull-left image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>{this.props.title}</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>


          <ul className="sidebar-menu">
            <li className="header">{this.props.mainheader}</li>
            {this.props.children}
          </ul>
      </section>
    </aside>
    )
  }
}

export default SiderBar
