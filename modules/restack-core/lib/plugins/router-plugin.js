'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = router;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function router(_ref) {
  var _ref$universal = _ref.universal,
      universal = _ref$universal === undefined ? false : _ref$universal,
      routes = _ref.routes,
      _ref$history = _ref.history,
      history = _ref$history === undefined ? _reactRouter.browserHistory : _ref$history;


  // enable navigation via redux actions
  // https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions
  // http://stackoverflow.com/questions/32612418/transition-to-another-route-on-successful-async-redux-action/32922381#32922381
  var theMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);

  return {
    name: "router",
    reducers: {
      routing: _reactRouterRedux.routerReducer
    },
    middlewares: [theMiddleware],
    // warp create
    create: function create(next, pre, app) {

      var syncedHistory = (0, _reactRouterRedux.syncHistoryWithStore)(history, app.store);

      next(_react2.default.createElement(_reactRouter.Router, { history: syncedHistory, children: routes }));
    },
    // warp render
    render: function render(next) {

      if (universal) {
        (0, _reactRouter.match)({ history: history, routes: routes }, function (error, redirectLocation, renderProps) {
          console.log('[router-plugin] match');
          next();
        });
      } else {
        next();
      }
    }

  };
}