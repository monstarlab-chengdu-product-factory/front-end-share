// ES5
//先来个父类，带些属性
function Super(){
    this.flag = true;
}
//为了提高复用性，方法绑定在父类原型属性上
Super.prototype.getFlag = function(){
    return this.flag;
}
// 来个子类
function Sub(){
    this.subFlag = false;
}
//实现继承
Sub.prototype = new Super;
//给子类添加子类特有的方法，注意顺序要在继承之后
Sub.prototype.getSubFlag = function(){
    return this.subFlag;
}

// 构造实例
var instance1 = new Sub()
instance1.flag // true 继承了Super的私有属性
instance1.getFlag() // true 继承了Super的原型属性
instance1.getSubFlag() // false 继承了Sub的原型属性
instance1.subFlag // false 继承了Sub的私有属性

// 以上的原型继承的方式会有问题。1，不够私有，由于原型里面的状态是共享的，所以只要改变其中一个，就会影响到所有的。2、创建子类的实例时，不能向父类的构造函数传递参数
instance1.flag = 'hahahh'
var instance2 = new Sub()
console.log(instance2.flag) //'true'  这里为啥不是hahaah？
// console.log(instance1.flag) //false 更改到了

// function Super(){
//     this.flag = true;
// }
// function Sub(){
//     this.subFlag = false;
// }
// Sub.prototype = new Super;
// var obj = new Sub();
// obj.flag = false;  //修改之后，由于是原型上的属性，之后创建的所有实例都会受到影响
// var obj_2 = new Sub();
// console.log(obj.flag)  //false 这里确实影响到了后面的实例

// 为了解决以上问题，使用call(apply)

function SuperType (name) {
    this.name = name
}
function SubType () {
    SuperType.call(this, '李宇春')
    this.age = 18
}
var instance3 = new SubType()
console.log(instance3.name) // 李宇春
console.log(instance3.age) // 18

instance3.age = 20
var instance4 = new SubType()
console.log(instance4.name) // 李宇春
console.log(instance4.age) // 18
console.log(instance3.age) // 20
