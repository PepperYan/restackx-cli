import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './modules/App'
import Index from './modules/demo/Index'

/*
* route配置的参数说明
* path : 路径
* component : 组件
* title : 在header bar上面显示的名字
* disableAnimated : 表示同设置为disableAnimated的路径直接跳转不会有动画效果
* */
const rootRoute = (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
  </Route>
)
//
// import NavContainer from './containers/navigation/NavContainer'
// import Page1 from './containers/navigation/Page1'
// import Page2 from './containers/navigation/Page2'

// const navRoute = (
//   <Route path="/" component={NavContainer}>
//
//     <IndexRoute component={Page1}/>
//     <Route path="two" component={Page2}/>
//   </Route>
// )

export default rootRoute
