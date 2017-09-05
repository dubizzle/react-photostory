'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAutoBind = require('react-auto-bind');

var _reactAutoBind2 = _interopRequireDefault(_reactAutoBind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Story = function (_Component) {
  _inherits(Story, _Component);

  function Story(props) {
    _classCallCheck(this, Story);

    var _this = _possibleConstructorReturn(this, (Story.__proto__ || Object.getPrototypeOf(Story)).call(this, props));

    _this.state = {
      isOpen: false,
      currentIndex: 0,
      length: 0,
      panImageUrl: null
    };

    _this.data = {};

    (0, _reactAutoBind2.default)(_this);
    return _this;
  }

  _createClass(Story, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('orientationchange', this.doOnOrientationChange);
      this.doOnOrientationChange();
    }
  }, {
    key: 'doOnOrientationChange',
    value: function doOnOrientationChange() {
      switch (window.orientation) {
        case -90 || 90:
          //'landscape'
          this.forceUpdate();
          break;
        default:
          //'portrait'
          this.forceUpdate();
          break;
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(_ref) {
      var _this2 = this;

      var index = _ref.index,
          length = _ref.length,
          title = _ref.title,
          subTitle = _ref.subTitle,
          image = _ref.image,
          data = _ref.data;
      var isOpen = this.state.isOpen;

      if (!isOpen) {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        this.data = data;
        this.setState({ isOpen: true, length: length, currentIndex: index, title: title, subTitle: subTitle }, function () {
          document.body.style.overflow = _this2.state.isOpen ? 'hidden' : null;
        });

        this.props.onOpen({ index: index, title: title, subTitle: subTitle, data: data });
      } else {
        // this.setState({
        //   panImageUrl: image
        // })
      }
    }
  }, {
    key: 'handleSwipe',
    value: function handleSwipe(_ref2) {
      var currentIndex = _ref2.currentIndex,
          title = _ref2.title,
          subTitle = _ref2.subTitle,
          data = _ref2.data;

      this.data = data;
      this.setState({ currentIndex: currentIndex, title: title, subTitle: subTitle });
    }
  }, {
    key: 'disablePan',
    value: function disablePan() {
      this.setState({ panImageUrl: false });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      var _this3 = this;

      document.getElementsByTagName('html')[0].style.overflow = 'auto';
      this.setState({
        isOpen: false
      }, function () {
        _this3.props.onClose({ index: _this3.state.currentIndex });
      });

      this.disablePan();
      document.body.style.overflow = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          height = _props.height,
          panHeight = _props.panHeight,
          closeBtn = _props.closeBtn,
          footerElem = _props.footerElem,
          headerElem = _props.headerElem;
      var _state = this.state,
          isOpen = _state.isOpen,
          currentIndex = _state.currentIndex,
          length = _state.length,
          title = _state.title,
          subTitle = _state.subTitle,
          panImageUrl = _state.panImageUrl;

      var mainClass = (0, _classnames2.default)('react-story', {
        open: isOpen,
        panImageUrl: !!panImageUrl
      });

      var style = isOpen ? {
        marginTop: -(panImageUrl ? panHeight : height) / 2
      } : {};

      var panStyle = {
        marginTop: -panHeight / 2,
        height: panHeight,
        display: 'none'
      };

      if (panImageUrl) {
        style.height = panHeight;
        style.overflowX = 'scroll';
        panStyle.display = 'block';
      }

      var args = {
        currentIndex: currentIndex,
        title: title,
        subTitle: subTitle,
        length: length,
        image: panImageUrl,
        data: this.data
      };

      return _react2.default.createElement(
        'div',
        { className: mainClass },
        isOpen && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'rs-close', onClick: this.closeModal },
            closeBtn
          ),
          _react2.default.createElement(
            'div',
            { className: 'rs-header' },
            headerElem(args)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'swipe-wrapper', style: style },
          children({
            handleClick: this.handleClick,
            handleSwipe: this.handleSwipe,
            height: isOpen ? height : undefined,
            index: currentIndex
          }),
          panImageUrl && _react2.default.createElement('img', {
            className: 'rs-pan-image',
            src: panImageUrl,
            onClick: this.disablePan,
            style: panStyle
          })
        ),
        isOpen && footerElem(args)
      );
    }
  }]);

  return Story;
}(_react.Component);

exports.default = Story;


Story.propTypes = {
  height: _propTypes2.default.number,
  closeBtn: _propTypes2.default.element,
  panHeight: _propTypes2.default.number,
  children: _propTypes2.default.func,
  headerElem: _propTypes2.default.func,
  footerElem: _propTypes2.default.func,
  onOpen: _propTypes2.default.func,
  onClose: _propTypes2.default.func
};

Story.defaultProps = {
  height: 300,
  panHeight: 500,
  closeBtn: _react2.default.createElement(
    'span',
    null,
    ' \u2715 '
  ),
  headerElem: function headerElem() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _react2.default.createElement(
      'span',
      null,
      'Photo ',
      args[0].currentIndex + 1,
      ' of ',
      args[0].length
    );
  },
  footerElem: function footerElem() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _react2.default.createElement(
      'div',
      { className: 'rs-footer' },
      _react2.default.createElement(
        'div',
        { className: 'rs-title' },
        args[0].title
      ),
      _react2.default.createElement(
        'div',
        { className: 'rs-sub-title' },
        args[0].subTitle
      )
    );
  },
  onClose: function onClose() {},
  onOpen: function onOpen() {}
};