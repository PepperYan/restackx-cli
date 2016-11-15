'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = i18n;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jed = require('jed');

var _jed2 = _interopRequireDefault(_jed);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sprintf(text) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return _jed2.default.sprintf.apply(_jed2.default, [text].concat(params));
}

var Tools = function Tools(_ref) {
  var _this = this;

  var localeData = _ref.localeData;
  var locale = _ref.locale;
  (0, _classCallCheck3.default)(this, Tools);

  this.l = function (text, context) {
    return context ? _this.jed.pgettext(context, text) : _this.jed.gettext(text);
  };

  this.nl = function (singular, plural, amount, context) {
    return context ? _this.jed.npgettext(context, singular, plural, amount) : _this.jed.ngettext(singular, plural, amount);
  };

  this.getLocale = function () {
    return _this.locale.toLowerCase();
  };

  this.getTimeFromNow = function (date) {
    _moment2.default.locale(_this.locale);

    return (0, _moment2.default)(date).fromNow();
  };

  this.humanizeDuration = function (time, unit) {
    _moment2.default.locale(_this.locale);

    var duration = _moment2.default.duration(time, unit);

    var hours = duration.hours();
    var hoursString = hours ? sprintf(_this.nl('%d hour', '%d hours', hours), hours) : '';

    var minutes = duration.minutes();
    var minutesString = minutes ? sprintf(_this.nl('%d minute', '%d minutes', minutes), minutes) : '';

    return hoursString + ' ' + minutesString;
  };

  this.jed = new _jed2.default(localeData);
  this.locale = locale;
};

var Provider = function (_React$Component) {
  (0, _inherits3.default)(Provider, _React$Component);

  function Provider() {
    (0, _classCallCheck3.default)(this, Provider);
    return (0, _possibleConstructorReturn3.default)(this, (Provider.__proto__ || (0, _getPrototypeOf2.default)(Provider)).apply(this, arguments));
  }

  (0, _createClass3.default)(Provider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { i18n: this.props.i18n };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);
  return Provider;
}(_react2.default.Component);

Provider.propTypes = {
  i18n: _react2.default.PropTypes.object.isRequired,
  children: _react2.default.PropTypes.object.isRequired
};
Provider.childContextTypes = { i18n: _react2.default.PropTypes.object };
function i18n(_ref2) {
  var _ref2$universal = _ref2.universal;
  var universal = _ref2$universal === undefined ? false : _ref2$universal;
  var defaultLocale = _ref2.defaultLocale;
  var getUserLocale = _ref2.getUserLocale;
  var setUserLocale = _ref2.setUserLocale;


  var userLocale = defaultLocale;

  getUserLocale = getUserLocale || function () {
    return userLocale || defaultLocale;
  };

  setUserLocale = setUserLocale || function (locale) {
    userLocale = locale;
  };

  function fetchLocaleData(locale, defaultLocale) {

    if (locale != defaultLocale) {
      return fetch('/static/lang/' + locale + '.json').then(function (res) {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }

        return { locale: locale, localeData: res.json() };
      });
    } else {
      return _promise2.default.resolve({ locale: locale, localeData: {} });
    }
  }

  return {

    name: "i18n",

    create: function create(next, pre) {
      fetchLocaleData(getUserLocale(), defaultLocale).then(function (_ref3) {
        var locale = _ref3.locale;
        var localeData = _ref3.localeData;

        console.log('[i18n-plugin.create] fetch locale data success');
        var tools = new Tools({ locale: locale, localeData: localeData });
        next(_react2.default.createElement(
          Provider,
          { i18n: tools },
          pre
        ));
      });
    },

    // generator
    // create: function* (pre) {
    //   const {locale, localeData} = yield call(fetchLocaleData, getUserLocale(), defaultLocale)
    //   const tools = new Tools({locale, localeData})
    //   return (
    //     <Provider i18n={tools}>
    //       {pre}
    //     </Provider>
    //   )
    // },

    render: function render(next) {
      next();
    }
  };
}