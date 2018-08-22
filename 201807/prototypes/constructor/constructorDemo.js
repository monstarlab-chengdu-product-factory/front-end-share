// 创建对象

// 工厂函数
function personFactory (name, age, job) {
    let newObject = new Object()
    newObject.name = name
    newObject.age = age
    newObject.job = job
    newObject.sayName = function () {
        console.log(' my name is ' + this.name)
    }
    return newObject
}
let personFactory1 = personFactory('李宇春', 18 , 'singer')
let personFactory2 = personFactory('chris', 18 , 'front-end')
console.log(personFactory1.name)
console.log(personFactory1.age)
console.log(personFactory1.sayName())
console.log(personFactory2.name)
console.log(personFactory2.age)
console.log(personFactory2.sayName())
let arr = []
// console.log(arr instanceof Array)
console.log(personFactory1 instanceof Object) // 在示例中，得到的都是newObject这个对象，对象的类型都是Object

// 构造函数
function PersonFactory (name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = function () {
        console.log('this is my name')
    }
}
let person1 = new PersonFactory('李宇春', 18 , 'singer')
let person2 = new PersonFactory('chris', 18 , 'front-end')
 // 构造函数做了什么事情？
// 1, 创建了一个新的对象，2，把构造函数的作用域给了新的对象， 3，执行构造函数中的代码，为这个新的对象添加属性 4，返回新的对象
console.log(person1.name)
console.log(person1.age)
console.log(person1.sayName())
console.log(person2.name)
console.log(person2.age)
console.log(person2.sayName())
// 可以从用构造函数得到当前函数的constructor 属性
console.log(person1.constructor === PersonFactory)
console.log(person2.constructor === PersonFactory)
console.log(arr.constructor === Array)
console.log(arr instanceof Array)


// 构造函数的问题
// 不同实例上的同名函数是不相同的,因为用这种方式创建函数，是创建的不同的作用域和标识符解析
console.log(person1.sayName == person2.sayName)

// 构造函数
function sayName () {
    console.log('this is my name' + this.name)
}
function Person (name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = sayName;
}
let person3 = new Person('李宇春', 18 , 'singer')
let person4 = new Person('chris', 18 , 'front-end')
person3.sayName()
person4.sayName()
// 上面是有问题的，由于一个函数的应用而定义了一个全局的方法供他调用，感觉不是很合理，如果有N个呢？岂不是要写N个全局函数
// 并且每次使用构造函数去实例化对象的时候，都会为实力的对象新开辟一个空间，如果数量较大的话，会浪费很大空间，并且生成的这些function的机制是一样的
//就感觉不是很有必要


//这时候就用原型来解决这个问题
// 原型模式
function Student () {
}
Student.prototype.name = '啥子'
Student.prototype.age = '18'
Student.prototype.job = 'singer'
Student.prototype.sayName = function () {
    console.log(this.name + '是我的名字')
}
let student1 = new Student()
let student2 = new Student()
console.log(student1.sayName === student2.sayName) // 这里说明他们就是共享的一个函数
// student1.prototype.sayName = function () {
//     console.log('我修改了原型里面的方法')
// }
student1.name = 'chenqiuxia'
student1.sayName()
student2.sayName()

console.log(Student.prototype.isPrototypeOf(student1))
console.log(Student.prototype.isPrototypeOf(student1))
// call 和apply 他们都是function自带的方法，作用是：调用一个对象的一个方法，用另一个对象替换当前对象。用前面那个方法去调用参数里面那个方法

// apply 的巧妙用法
console.log(Math.max.apply(null, [2,4,6,1,1000]))
console.log(Math.min.apply(null, [2,4,6,1,1000]))

// function add (a,b) {
//     return a + b
// }
// function sub (a,b, c) {
//     return a-b-c
// }
// let a1 = add.apply(sub, [3,2,1])
// let a2 = sub.apply(add, [3,2,1])
// let a3 = add.call(sub, 3,2)
// let a4 = sub.call(add, 3,2,1)
// console.log(a1)
// console.log(a2)
// console.log(a3)
// console.log(a4)

// 以上内容展示了apply和call的写法的不同
// TODO: 但是这样调用和直接调用函数的结果是一样的，那我为什么要这么写？
// 实现继承
// function Family (father, mother) {
//     this.father = father
//     this.mother = mother
//     this.hello = function () {
//         console.log('this is my father' + this.father)
//     }
// }
// function callThem (name) {
//     Family.apply(this, [name])
// }
// let family = new callThem(['A'])
// family.hello()
