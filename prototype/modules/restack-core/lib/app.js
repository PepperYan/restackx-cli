'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _modal = require('./reducers/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// core frameworks
var App = function () {
  function App(config) {
    (0, _classCallCheck3.default)(this, App);

    this.config = config || {};
  }

  (0, _createClass3.default)(App, [{
    key: 'fetchLocalePromise',
    value: function fetchLocalePromise(needsI18n, userLocale, defaultLocale) {
      if (needsI18n && userLocale != defaultLocale) {
        return _i18n2.default.fetchLocaleData(userLocale).then(function (localeData) {
          return { locale: userLocale, localeData: localeData };
        });
      } else {
        return _promise2.default.resolve({ locale: userLocale, localeData: {} });
      }
    }
  }, {
    key: 'createRootComponent',
    value: function createRootComponent(_ref) {
      var locale = _ref.locale;
      var localeData = _ref.localeData;


      var reducers = (0, _extends3.default)({
        modal: _modal2.default
      }, this._reducers);

      var initialState = window.__INITIAL_STATE__ || {};
      var store = (0, _configureStore2.default)(reducers, initialState, this._middlewares);
      var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);
      var i18nTools = new _i18n2.default.Tools({ localeData: localeData, locale: locale });

      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          _i18n2.default.Provider,
          { i18n: i18nTools },
          _react2.default.createElement(_reactRouter.Router, { history: history, children: this._routes })
        )
      );
    }
  }, {
    key: 'render',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(el) {
        var _config, locales, defaultLocale, userLocale, _ref3, locale, localeData, RootComponent;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _config = this.config;
                locales = _config.locales;
                defaultLocale = _config.defaultLocale;
                userLocale = _i18n2.default.getUserLocale(defaultLocale);
                _context.next = 6;
                return this.fetchLocalePromise(locales != null, userLocale, defaultLocale);

              case 6:
                _ref3 = _context.sent;
                locale = _ref3.locale;
                localeData = _ref3.localeData;
                RootComponent = this.createRootComponent({ locale: locale, localeData: localeData });

                if (!el) {
                  _context.next = 14;
                  break;
                }

                _reactDom2.default.render(RootComponent, el);
                _context.next = 15;
                break;

              case 14:
                return _context.abrupt('return', RootComponent);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render(_x) {
        return _ref2.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: 'routes',
    set: function set(routes) {
      this._routes = routes;
    }
  }, {
    key: 'reducers',
    set: function set(reducers) {
      this._reducers = reducers;
    }
  }, {
    key: 'middlewares',
    set: function set(middlewares) {
      this._middlewares = middlewares;
    }
  }]);
  return App;
}();

exports.default = App;