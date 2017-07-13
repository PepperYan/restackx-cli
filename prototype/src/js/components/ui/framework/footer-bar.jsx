import React, { Component, PropTypes } from 'react'


class FooterBar extends Component{

  render() {
    return (
      <footer className="main-footer">
        {this.props.children}
      </footer>
    )
  }
}

FooterBar.propTypes = {

}

export default FooterBar
