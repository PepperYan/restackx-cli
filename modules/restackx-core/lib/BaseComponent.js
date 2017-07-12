'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseComponent = exports.BaseComponent = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(BaseComponent, _Component);

  function BaseComponent() {
    (0, _classCallCheck3.default)(this, BaseComponent);
    return (0, _possibleConstructorReturn3.default)(this, (BaseComponent.__proto__ || (0, _getPrototypeOf2.default)(BaseComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(BaseComponent, [{
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);
  return BaseComponent;
}(_react.Component), _class.contextTypes = {
  store: _propTypes2.default.object
}, _temp);