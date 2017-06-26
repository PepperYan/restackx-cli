import React,{ Component, Children } from 'react'
import PropTypes from 'prop-types'


export class Provider extends Component {
  static childContextTypes = {
    store : PropTypes.object.isRequired
  }

  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store || context.store
  }

  render() {
    const { children } = this.props
    return Children.only(children)
  }
}

if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    const { store } = this
    const { store: nextStore } = nextProps

    if (store !== nextStore) {
      warnAboutReceivingStore()
    }
  }
}
