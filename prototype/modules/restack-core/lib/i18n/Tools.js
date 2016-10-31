'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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

exports.default = Tools;