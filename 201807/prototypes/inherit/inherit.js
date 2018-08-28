// ES5
function Super () {
    this.flag = true
}
Super.prototype.showFlag = function () {
    return this.flage
}
function Sub () {
    this.subFlag = true
}
Sub.prototype = new Super()
Sub.prototype.showFlag = function () {
    return this.subFlag
}
// 构造实例
var es5 = new Sub()