"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Jpg = "/pages/index/WechatI1.jpeg";

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["test", "src"], _this.config = {
      navigationBarTitleText: '首页',
      usingComponents: {
        painter: '/pages/painter/painter'
      }
    }, _this.onImgOK = function (e) {
      _this.setState({
        src: e.detail.path
      });
    }, _this.draw = function () {
      var views = [{
        type: 'image',
        url: Jpg,
        css: {
          width: '300px',
          height: '416px',
          top: '0px',
          left: '0px'
        }
      }, {
        type: 'qrcode',
        content: '樱木花道',
        css: {
          width: '50px',
          height: '50px',
          top: '200px',
          left: '60px',
          shadow: '10px 10px 5px #888888'
        }
      }];
      var text = '我果然是个天才!';
      var tmpText = '';
      var index = 0;
      for (var i = 0; i < text.length; i++) {
        tmpText = "" + text[i];
        views.push({
          type: 'text',
          text: tmpText,
          css: {
            left: '20px',
            top: 150 + index + "px",
            fontSize: '40rpx',
            lineHeight: '50rpx',
            shadow: '10px 10px 5px #888888',
            rotate: '20',
            textStyle: 'stroke'
          }
        });
        index += 30;
        tmpText = '';
      }
      return {
        width: '300px',
        height: '416px',
        background: '#ccc',
        views: views
      };
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
    }

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    // state={
    //   test:{
    //     width: '300px',
    //     height: '416px',
    //     background: Jpg,
    //     views: [
    //       {
    //         type:'text',
    //         text:'我\n果\n然\n是\n个\n天\n才\n!',
    //         css:{
    //           top:'300px',
    //           left:'20px',
    //         }
    //       }
    //     ]
    //   }

    // }

  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        test: this.draw()
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state = this.__state,
          test = _state.test,
          src = _state.src;

      console.log('test', test);
      Object.assign(this.__state, {
        test: test,
        src: src
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["onImgOK", "onImgErr"], _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));