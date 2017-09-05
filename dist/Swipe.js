'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var Swipe = function (_Component) {
  _inherits(Swipe, _Component);

  function Swipe(props) {
    _classCallCheck(this, Swipe);

    var _this = _possibleConstructorReturn(this, (Swipe.__proto__ || Object.getPrototypeOf(Swipe)).call(this, props));

    _this.state = {
      currentIndex: props.initialIndex,
      width: 0,
      scrollLeft: 0,
      drag: 0,
      data: {}
    };

    (0, _reactAutoBind2.default)(_this);
    return _this;
  }

  _createClass(Swipe, [{
    key: 'doOnOrientationChange',
    value: function doOnOrientationChange() {
      switch (window.orientation) {
        case -90 || 90:
          // 'landscape'
          this.setWidth();
          this.initLazyLoad();
          break;
        default:
          // 'portrait'
          this.setWidth();
          this.initLazyLoad();
          break;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('orientationchange', this.doOnOrientationChange);
      window.onresize = function () {
        this.doOnOrientationChange();
      };

      this.doOnOrientationChange();
      this.setWidth();
      this.initLazyLoad();

      if (this.props.autoPlay) this.autoPlay(this.props);

      if (this.props.responsive) {
        window.addEventListener('resize', this.setWidth, false);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.autoPlay !== nextProps.autoPlay) {
        nextProps.autoPlay ? this.autoPlay(nextProps) : this.pause();
      }
    }
  }, {
    key: 'setWidth',
    value: function setWidth() {
      if (this.swipeRef) {
        this.setState({
          width: this.swipeRef.clientWidth
        });
      }
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      if (this.hasSingleImage()) return;
      this.clientX = e.touches[0].clientX;
      document.addEventListener('touchmove', this.handleTouchMove, false);
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      var _this2 = this;

      if (this.hasSingleImage()) return;
      var _state = this.state,
          drag = _state.drag,
          currentIndex = _state.currentIndex,
          width = _state.width;
      var threshold = this.props.threshold;


      var initialIndex = currentIndex;

      if (Math.abs(drag) > threshold * width) {
        this.setState(function () {
          if (drag < 0 && currentIndex > 0) {
            return {
              // goto previous slide
              currentIndex: currentIndex - 1
            };
          } else if (drag > 0 && currentIndex + 1 < _this2.props.children.length) {
            return {
              // goto next slide
              currentIndex: currentIndex + 1
            };
          }
        }, function () {
          _this2.onChange(initialIndex);
        });
      }

      this.setState({
        drag: 0
      });

      document.removeEventListener('touchmove', this.handleTouchMove, false);
    }
  }, {
    key: 'initLazyLoad',
    value: function initLazyLoad() {
      var currentIndex = this.state.currentIndex;
      var _props = this.props,
          overScan = _props.overScan,
          children = _props.children;

      if (this['imageRef' + currentIndex]) {
        this['imageRef' + currentIndex].load();
      }
      if (overScan === 1) {
        if (currentIndex > 0 && this['imageRef' + (currentIndex - 1)]) {
          this['imageRef' + (currentIndex - 1)].load();
        }
        if (currentIndex + 1 < children.length && this['imageRef' + (currentIndex + 1)]) {
          this['imageRef' + (currentIndex + 1)].load();
        }
      }
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      this.setState({
        drag: this.clientX - e.touches[0].clientX
      });
    }
  }, {
    key: 'gotoPrev',
    value: function gotoPrev() {
      var currentIndex = this.state.currentIndex;

      if (currentIndex > 0) {
        this.gotoSlide(currentIndex - 1, false);
      }
    }
  }, {
    key: 'gotoNext',
    value: function gotoNext() {
      var currentIndex = this.state.currentIndex;

      if (currentIndex + 1 < this.props.children.length) {
        this.gotoSlide(currentIndex + 1, false);
      }
    }
  }, {
    key: 'gotoSlide',
    value: function gotoSlide(i) {
      var _this3 = this;

      var isManual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (isManual) this.pause();
      var initial = this.state.currentIndex;
      this.setState({
        currentIndex: i
      }, function () {
        return _this3.onChange(initial);
      });
    }
  }, {
    key: 'autoPlay',
    value: function autoPlay(props) {
      var _this4 = this;

      var children = props.children,
          autoPlayInterval = props.autoPlayInterval;

      this.pause();

      if (this.hasSingleImage()) return;

      this.autoPlayId = setInterval(function () {
        var currentIndex = _this4.state.currentIndex;

        if (currentIndex + 1 < children.length) {
          _this4.gotoNext();
        } else {
          _this4.gotoSlide(0, currentIndex);
        }
      }, autoPlayInterval);
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearInterval(this.autoPlayId);
    }
  }, {
    key: 'onChange',
    value: function onChange(initialIndex) {
      var childProps = this.props.children[this.state.currentIndex].props;

      this.props.onSwipe({
        currentIndex: this.state.currentIndex,
        initialIndex: initialIndex,
        title: childProps.title,
        subTitle: childProps.subTitle,
        data: childProps.data
      });
      this.initLazyLoad();
    }
  }, {
    key: 'hasSingleImage',
    value: function hasSingleImage() {
      return this.props.children.length === 1;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      setTimeout(this.setWidth, 0);

      var childProps = this.props.children[this.state.currentIndex].props;

      this.props.onClick({
        index: this.state.currentIndex,
        length: this.props.children.length,
        title: childProps.title,
        subTitle: childProps.subTitle,
        image: childProps.image,
        data: childProps.data
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.setWidth);
      if (this.autoPlayId) clearInterval(this.autoPlayId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props2 = this.props,
          className = _props2.className,
          children = _props2.children,
          prev = _props2.prev,
          next = _props2.next,
          initialIndex = _props2.initialIndex,
          renderFirst = _props2.renderFirst,
          height = _props2.height;
      var _state2 = this.state,
          width = _state2.width,
          drag = _state2.drag,
          currentIndex = _state2.currentIndex;


      var mainClass = (0, _classnames2.default)('react-swipe', className);

      var nextClass = (0, _classnames2.default)('rs-next', {
        disabled: currentIndex + 1 >= children.length
      });

      var prevClass = (0, _classnames2.default)('rs-prev', {
        disabled: currentIndex === 0
      });

      var style = {
        width: width ? children.length * width + 'px' : 'auto',
        WebkitTransform: 'translateX(' + (-(currentIndex * width) - drag) + 'px)',
        MozTransform: 'translateX(' + (-(currentIndex * width) - drag) + 'px)',
        msTransform: 'translateX(' + (-(currentIndex * width) - drag) + 'px)',
        OTransform: 'translateX(' + (-(currentIndex * width) - drag) + 'px)',
        transform: 'translateX(' + (-(currentIndex * width) - drag) + 'px)'
      };

      var self = this;
      var children$ = _react2.default.Children.map(children, function (child, index) {
        return _react2.default.cloneElement(child, {
          width: width,
          ref: function ref(_ref) {
            return self['imageRef' + index] = _ref;
          },
          attributes: _extends({}, child.props.attributes, {
            'data-index': index
          }),
          lazyLoad: renderFirst ? index !== initialIndex : true
        });
      });

      return _react2.default.createElement(
        'div',
        { className: mainClass },
        _react2.default.createElement(
          'div',
          {
            className: 'rs-swipe-gallery',
            ref: function ref(swipe) {
              return _this5.swipeRef = swipe;
            },
            style: { height: height }
          },
          _react2.default.createElement(
            'div',
            {
              className: 'rs-imgs-wrapper',
              style: style,
              onTouchStart: this.handleTouchStart,
              onTouchEnd: this.handleTouchEnd,
              onClick: this.handleClick
            },
            children$
          )
        ),
        !this.hasSingleImage() && _react2.default.createElement(
          'div',
          { className: prevClass, onClick: this.gotoPrev },
          prev
        ),
        !this.hasSingleImage() && _react2.default.createElement(
          'div',
          { className: nextClass, onClick: this.gotoNext },
          next
        )
      );
    }
  }]);

  return Swipe;
}(_react.Component);

exports.default = Swipe;


Swipe.propTypes = {
  // autoplay true or false
  autoPlay: _propTypes2.default.bool,

  // interval for autoplay
  autoPlayInterval: _propTypes2.default.number,

  // custom class name for the component
  className: _propTypes2.default.string,

  // number of images to be loaded in advance
  overScan: _propTypes2.default.oneOf([0, 1]),

  // function called on slide change
  // argument { initialIndex, currentIndex }
  onSwipe: _propTypes2.default.func,

  // function called on slide is clicked
  // argument { index }
  onClick: _propTypes2.default.func,

  // index of initially visible image
  initialIndex: _propTypes2.default.number,

  // drag ratio of full width for successful swipe
  threshold: _propTypes2.default.number,

  // whether responsive to window resize
  responsive: _propTypes2.default.bool,

  // prev React element
  prev: _propTypes2.default.element,

  // next React element
  next: _propTypes2.default.element,

  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),

  renderFirst: _propTypes2.default.bool,

  height: _propTypes2.default.number
};

Swipe.defaultProps = {
  autoPlay: false,
  autoPlayInterval: 4000,
  overScan: 1,
  initialIndex: 0,
  onSwipe: function onSwipe() {},
  onClick: function onClick() {},

  prev: _react2.default.createElement(
    'button',
    null,
    'PREV'
  ),
  next: _react2.default.createElement(
    'button',
    null,
    'NEXT'
  ),
  threshold: 0.5,
  responsive: false,
  renderFirst: true,
  height: 300
};