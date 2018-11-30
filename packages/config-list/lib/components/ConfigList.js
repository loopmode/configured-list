"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread8 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _shapes = require("../utils/shapes");

var _bind = _interopRequireDefault(require("../utils/bind"));

var _SelectRenderer = _interopRequireDefault(require("./SelectRenderer"));

var _ListRenderer = _interopRequireDefault(require("./ListRenderer"));

var _ItemRenderer = _interopRequireDefault(require("./ItemRenderer"));

var _DataConverter = _interopRequireDefault(require("./DataConverter"));

var ConfigList =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(ConfigList, _PureComponent);

  function ConfigList(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, ConfigList);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConfigList).call(this, props, context));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      removing: {},
      editing: {}
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "convertItems", (0, _memoizeOne.default)(function (items) {
      return _DataConverter.default.convertItems(items);
    }));
    (0, _bind.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ConfigList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          editable = _this$props.editable,
          removable = _this$props.removable,
          configuredItems = _this$props.configuredItems,
          SelectRenderer = _this$props.SelectRenderer,
          ListRenderer = _this$props.ListRenderer,
          ItemRenderer = _this$props.ItemRenderer,
          ItemValueRenderer = _this$props.ItemValueRenderer,
          onAddItem = _this$props.onAddItem;
      var hasConfiguredItems = configuredItems && configuredItems.length > 0;
      var availableItems = this.convertItems(this.props.availableItems);
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('ConfigList', className)
      }, _react.default.createElement(SelectRenderer, {
        availableItems: availableItems,
        configuredItems: configuredItems,
        onAddItem: onAddItem,
        parentProps: this.props
      }), hasConfiguredItems && _react.default.createElement(ListRenderer, {
        availableItems: availableItems,
        configuredItems: configuredItems,
        parentProps: this.props
      }, configuredItems.map(function (item) {
        var editorData = _this2.state.editing[item.key || item.id];
        var isRemoving = !!_this2.state.removing[item.key || item.id];
        var isEditing = !!editorData;
        return _react.default.createElement(ItemRenderer, {
          editable: editable,
          removable: removable,
          ItemValueRenderer: ItemValueRenderer,
          key: item.key || item.id,
          item: item,
          parentProps: _this2.props // removing
          ,
          isRemoving: isRemoving,
          onRemove: _this2.handleRemove,
          onRemoveConfirm: _this2.handleRemoveConfirm,
          onRemoveCancel: _this2.handleRemoveCancel // editing
          ,
          isEditing: isEditing,
          onEdit: _this2.handleEdit,
          onEditConfirm: _this2.handleEditConfirm,
          onEditCancel: _this2.handleEditCancel,
          editor: _this2.renderItemEditor(item)
        });
      })));
    }
  }, {
    key: "renderItemEditor",
    value: function renderItemEditor(item) {
      var ItemEditor = this.props.ItemEditor;
      var editorData = this.state.editing[item.key || item.id];

      if (!editorData) {
        return null;
      }

      var editorContent = null;

      if (ItemEditor) {
        editorContent = _react.default.createElement(ItemEditor, {
          key: item.key || item.id,
          item: item,
          parentProps: this.props,
          onEditConfirm: this.handleEditConfirm,
          onEditCancel: this.handleEditCancel
        });
      } else {
        editorContent = _react.default.createElement("div", null, "No ", _react.default.createElement("code", null, "ItemEditor"), " provided");
      }

      return editorContent;
    } // -------------------------------------------------
    //
    //          EDIT ITEM
    //
    // -------------------------------------------------

  }, {
    key: "handleEdit",
    value: function handleEdit(_ref) {
      var item = _ref.item;
      this.setState({
        editing: (0, _objectSpread8.default)({}, this.state.editing, (0, _defineProperty2.default)({}, item.key || item.id, true))
      });
    }
  }, {
    key: "handleEditCancel",
    value: function handleEditCancel(_ref2) {
      var item = _ref2.item;
      this.setState({
        editing: (0, _objectSpread8.default)({}, this.state.editing, (0, _defineProperty2.default)({}, item.key || item.id, false))
      });
    }
  }, {
    key: "handleEditConfirm",
    value: function handleEditConfirm(_ref3) {
      var item = _ref3.item,
          data = _ref3.data;
      this.setState({
        editing: (0, _objectSpread8.default)({}, this.state.editing, (0, _defineProperty2.default)({}, item.key || item.id, false))
      });

      if (!this.props.onEditItem) {
        return;
      }

      this.props.onEditItem({
        item: item,
        data: data,
        event: event
      });
    } // -------------------------------------------------
    //
    //          REMOVE ITEM
    //
    // -------------------------------------------------

  }, {
    key: "handleRemove",
    value: function handleRemove(_ref4) {
      var item = _ref4.item,
          event = _ref4.event;

      if (this.props.confirmRemove) {
        this.setState({
          removing: (0, _objectSpread8.default)({}, this.state.removing, (0, _defineProperty2.default)({}, item.key || item.id, true))
        });
      } else if (this.props.onRemoveItem) {
        this.props.onRemoveItem({
          item: item,
          event: event
        });
      }
    }
  }, {
    key: "handleRemoveCancel",
    value: function handleRemoveCancel(_ref5) {
      var item = _ref5.item;
      this.setState({
        removing: (0, _objectSpread8.default)({}, this.state.removing, (0, _defineProperty2.default)({}, item.key || item.id, false))
      });
    }
  }, {
    key: "handleRemoveConfirm",
    value: function handleRemoveConfirm(_ref6) {
      var item = _ref6.item;
      this.setState({
        removing: (0, _objectSpread8.default)({}, this.state.removing, (0, _defineProperty2.default)({}, item.key || item.id, false))
      });

      if (!this.props.onRemoveItem) {
        return;
      }

      this.props.onRemoveItem({
        item: item,
        event: event
      });
    }
  }]);
  return ConfigList;
}(_react.PureComponent);

exports.default = ConfigList;
(0, _defineProperty2.default)(ConfigList, "propTypes", {
  className: _propTypes.default.string,
  availableItems: _shapes.SupportedItemsShape,
  configuredItems: _shapes.SupportedItemsShape,
  SelectRenderer: _propTypes.default.func,
  ListRenderer: _propTypes.default.func,
  ItemRenderer: _propTypes.default.func,
  ItemValueRenderer: _propTypes.default.func,
  ItemEditor: _propTypes.default.func,
  //
  editable: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  removable: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  //
  onAddItem: _propTypes.default.func,
  onEditItem: _propTypes.default.func,
  onRemoveItem: _propTypes.default.func,
  //
  confirmRemove: _propTypes.default.bool
});
(0, _defineProperty2.default)(ConfigList, "defaultProps", {
  SelectRenderer: _SelectRenderer.default,
  ListRenderer: _ListRenderer.default,
  ItemRenderer: _ItemRenderer.default
});