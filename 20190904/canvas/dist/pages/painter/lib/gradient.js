'use strict';

/* eslint-disable */
// 当ctx传入当前文件，const grd = ctx.createCircularGradient() 和 
// const grd = this.ctx.createLinearGradient() 无效，因此只能分开处理
// 先分析，在外部创建grd，再传入使用就可以

!function () {

  var api = {
    isGradient: function isGradient(bg) {
      if (bg && (bg.startsWith('linear') || bg.startsWith('radial'))) {
        return true;
      }
      return false;
    },

    doGradient: function doGradient(bg, width, height, ctx) {
      if (bg.startsWith('linear')) {
        linearEffect(width, height, bg, ctx);
      } else if (bg.startsWith('radial')) {
        radialEffect(width, height, bg, ctx);
      }
    }
  };

  function analizeGrad(string) {
    var colorPercents = string.substring(0, string.length - 1).split("%,");
    var colors = [];
    var percents = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = colorPercents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var colorPercent = _step.value;

        colors.push(colorPercent.substring(0, colorPercent.lastIndexOf(" ")).trim());
        percents.push(colorPercent.substring(colorPercent.lastIndexOf(" "), colorPercent.length) / 100);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return { colors: colors, percents: percents };
  }

  function radialEffect(width, height, bg, ctx) {
    var colorPer = analizeGrad(bg.match(/radial-gradient\((.+)\)/)[1]);
    var grd = ctx.createCircularGradient(0, 0, width < height ? height / 2 : width / 2);
    for (var i = 0; i < colorPer.colors.length; i++) {
      grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
    }
    ctx.setFillStyle(grd);
    ctx.fillRect(-(width / 2), -(height / 2), width, height);
  }

  function analizeLinear(bg, width, height) {
    var direction = bg.match(/([-]?\d{1,3})deg/);
    var dir = direction && direction[1] ? parseFloat(direction[1]) : 0;
    var coordinate = void 0;
    switch (dir) {
      case 0:
        console.log('case 0:');coordinate = [0, -height / 2, 0, height / 2];break;
      case 90:
        console.log('case 90:');coordinate = [width / 2, 0, -width / 2, 0];break;
      case -90:
        console.log('case -90:');coordinate = [-width / 2, 0, width / 2, 0];break;
      case 180:
        console.log('case 180:');coordinate = [0, height / 2, 0, -height / 2];break;
      case -180:
        console.log('case -180:');coordinate = [0, -height / 2, 0, height / 2];break;
      default:
        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        if (direction[1] > 0 && direction[1] < 90) {
          x1 = width / 2 - (width / 2 * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        } else if (direction[1] > -180 && direction[1] < -90) {
          x1 = -(width / 2) + (width / 2 * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        } else if (direction[1] > 90 && direction[1] < 180) {
          x1 = width / 2 + (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        } else {
          x1 = -(width / 2) - (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (90 - direction[1]) * Math.PI * 2 / 360) / 2;
          y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
          x2 = -x1;
          y1 = -y2;
        }
        coordinate = [x1, y1, x2, y2];
        break;
    }
    return coordinate;
  }

  function linearEffect(width, height, bg, ctx) {
    var param = analizeLinear(bg, width, height);
    var grd = ctx.createLinearGradient(param[0], param[1], param[2], param[3]);
    var content = bg.match(/linear-gradient\((.+)\)/)[1];
    var colorPer = analizeGrad(content.substring(content.indexOf(',') + 1));
    for (var i = 0; i < colorPer.colors.length; i++) {
      grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
    }
    ctx.setFillStyle(grd);
    ctx.fillRect(-(width / 2), -(height / 2), width, height);
  }

  module.exports = { api: api };
}();