import { Component, Children} from 'react'
import PropTypes from 'prop-types'


export class BaseComponent extends Component{
  static contextTypes = {
    store: PropTypes.object
  }

  render(){
    return Children.only(this.props.children)
  }
}
