// ES5
//先来个父类，带些属性
function GrandFather (job) {
    this.bigHouse = true
    this.job = job
    this.number = ['one', 'two']
}
// //为了提高复用性，方法绑定在父类原型属性上
GrandFather.prototype.grandFatherMoney = function () {
    console.log('一大把')
    return this.bigHouse
}
// 来个子类
function Father (job) {
    GrandFather.call(this, job) // 为了解决属性不够私有，并且不能传递参数的问题
    this.house = true
}
// 让father 从GrandFather哪儿继承的方法一 叫借用构造函数
Father.prototype = new GrandFather()
Father.prototype.fatherMoney = function () {
    console.log('一点点')
    return this.house
}
//实现继承
// 构造实例
var me = new Father('喂猪的')
var brother = new Father()
console.log(me.bigHouse) // true
console.log('我的job是：' + me.job) // 我的job是：喂猪的
console.log(me.house) // true
console.log(me.grandFatherMoney()) // 继承了爷爷的钱 一大把
console.log(me.fatherMoney()) // 继承了爷爷的钱 一点点
me.number.push('there')
console.log(me.number)
console.log(brother.number)

// es6
// 需要说明的是es6 里面的class不能变量提升，必须先声明再调用，否则 报错
class Animal {
    constructor (name) {
        this.name = name
        this.master = 'me'
        this.y = 2
        this.family = ['mother', 'father']
    }
    speak () {
        console.log(this.name + 'makes a noise.')
    }
    
}
class Dog extends Animal{
    constructor (name, what) {
        super(name)
        this.master = 'myMaster'
        this.what = what
    }
    dogSpeak () {
        super.speak() // 调用父类的属性必须些super关键字
        console.log(this.name + '这是dog里面的名字')
        console.log(this.family + '这里是父亲的family') // 如果子类里面没有指定this ，那么这个this是指向的父类的this
    }
    static util (x, y) {
        return x * y
    }
}
let yellowDog = new Dog('yellowDog','what')
console.log(yellowDog.master) // myMaster
console.log(yellowDog.dogSpeak()) // yellowDog makes a noise.  yellowDog这是dog里面的名字
console.log(yellowDog.speak()) // yellowDog makes a noise
console.log(Dog.util(3, 2)) // static 关键字来定义一个类的静态方法，静态方法通常用于为一个应用程序创建工具函数。
console.log(yellowDog.y)
yellowDog.family.push('brother')
console.log(yellowDog.family) //["mother", "father", "brother"]
console.log(yellowDog.what) //
let blueDog = new Dog('blueDog')
console.log(blueDog.family) // ["mother", "father"],没有收到影响
// console.log(yellowDog.util(3, 2)) // 并且不能用类的实例来调用，这样会报错

// console.log(person.hasOwnProperty('x'));//true
// console.log(person.hasOwnProperty('y'));//true
// console.log(person.hasOwnProperty('toString'));//false
// console.log(person.__proto__.hasOwnProperty('toString'));//true
// 说明对象上有X,Y属性，但是没有toString属性，也就是说x，y是定义在this对象上，toSting是定义在类上的
