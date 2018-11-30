"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _semanticUiReact = require("semantic-ui-react");

var _AsyncState = _interopRequireDefault(require("./AsyncState"));

var ModalDialog =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(ModalDialog, _PureComponent);

  function ModalDialog() {
    (0, _classCallCheck2.default)(this, ModalDialog);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ModalDialog).apply(this, arguments));
  }

  (0, _createClass2.default)(ModalDialog, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          content = _this$props.content,
          onConfirm = _this$props.onConfirm,
          onCancel = _this$props.onCancel,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["title", "content", "onConfirm", "onCancel"]);
      return _react.default.createElement(_semanticUiReact.Modal, (0, _objectSpread2.default)({
        open: true
      }, props), _react.default.createElement(_semanticUiReact.Modal.Header, null, title), _react.default.createElement(_semanticUiReact.Modal.Content, null, _react.default.createElement(_semanticUiReact.Modal.Description, null, content)), _react.default.createElement(_semanticUiReact.Modal.Actions, null, _react.default.createElement(_semanticUiReact.Button, {
        onClick: onCancel
      }, "Cancel"), _react.default.createElement(_AsyncState.default, null, _react.default.createElement(_semanticUiReact.Button, {
        negative: true,
        onClick: onConfirm
      }, "Confirm"))));
    }
  }]);
  return ModalDialog;
}(_react.PureComponent);

exports.default = ModalDialog;
(0, _defineProperty2.default)(ModalDialog, "propTypes", {
  title: _propTypes.default.string,
  content: _propTypes.default.string,
  onConfirm: _propTypes.default.func,
  onCancel: _propTypes.default.func
});