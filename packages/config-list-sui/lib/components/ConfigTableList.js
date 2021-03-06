"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _configList = _interopRequireDefault(require("@loopmode/config-list"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TableListRenderer = _interopRequireDefault(require("./TableListRenderer"));

var _TableItemRenderer = _interopRequireDefault(require("./TableItemRenderer"));

var _SelectRenderer = _interopRequireDefault(require("./SelectRenderer"));

var defaults = _interopRequireWildcard(require("../defaults"));

var ConfigTableList =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(ConfigTableList, _PureComponent);

  function ConfigTableList() {
    (0, _classCallCheck2.default)(this, ConfigTableList);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConfigTableList).apply(this, arguments));
  }

  (0, _createClass2.default)(ConfigTableList, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_configList.default, (0, _extends2.default)({}, this.props, {
        className: (0, _classnames.default)('ConfigTableList', this.props.className)
      }));
    }
  }]);
  return ConfigTableList;
}(_react.PureComponent);

exports.default = ConfigTableList;
(0, _defineProperty2.default)(ConfigTableList, "COLUMN_FIELD_ACTIONS", defaults.COLUMN_FIELD_ACTIONS);
(0, _defineProperty2.default)(ConfigTableList, "COLUMN_FIELD_ITEM", defaults.COLUMN_FIELD_ITEM);
(0, _defineProperty2.default)(ConfigTableList, "propTypes", {
  className: _propTypes.default.string,
  SelectRenderer: _propTypes.default.func,
  ListRenderer: _propTypes.default.func,
  ItemRenderer: _propTypes.default.func,
  ItemEditor: _propTypes.default.func
});
(0, _defineProperty2.default)(ConfigTableList, "defaultProps", {
  SelectRenderer: _SelectRenderer.default,
  ListRenderer: _TableListRenderer.default,
  ItemRenderer: _TableItemRenderer.default
});