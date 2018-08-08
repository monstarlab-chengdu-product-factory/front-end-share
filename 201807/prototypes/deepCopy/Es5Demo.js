// 一、数组Array ES5 的写法
// 浅拷贝：相当于使两个数组指针指向相同的地址，任一个数组元素发生改变，影响另一个。
// 深拷贝：两数组指针指向不同的地址，数组元素发生改变时不会相互影响。

// 一维数组
let aArrary = [1,2,3,4]

let copyAArrary = aArrary.concat([])
copyAArrary[0] = 'changed'
console.log(copyAArrary)
console.log(aArrary)

let bArrary = aArrary.slice(0)
bArrary[0] = 'changed'
console.log(bArrary)




// 二维及以上的数组
let dArrary = [
    {a: 'what'}, '12',[1,2,3,4]
]
let copyDArrary = copyArr(dArrary)
function copyArr(arr) {
    let res = []
    for (let i = 0; i<arr.length; i ++) {
        res.push(arr[i])
    }
    return res
}
copyDArrary[1]='13'
console.log(copyDArrary)
console.log(dArrary)


// jqery的extend
var a = [[1, 2, 3], 4, [5, 6]]
b = $.extend([], a)
console.log("a: ",a)
console.log("b: ",b)
// 此次不表


// ES6扩展运算符实现数组的深拷贝
let eArrary = [...dArrary]
eArrary[1]='10'
console.log(eArrary)

// map
// 二、对象 ES5 的深拷贝写法

// 1，转成 JSON 再转回来
let person = {
    name: '李宇春',
    sex: 'girl',
    old: '18',
    dance:{today:false, tomorrow:true}
}
let newPerson = JSON.parse(JSON.stringify(person))
newPerson.dance.today=true
console.log('这里是原始的对象');
console.log(person);
console.log('这里是用Json转换后的对象');
console.log(newPerson);

// 2，Object方法
let newPerson2 = Object.assign({}, person) // Object.assign() 只能实现一层的深拷贝，不能拷贝一层以上的
newPerson2.name = '陈秋霞'
console.log('这里是用Object拷贝后的对象，他只能深拷贝一层的数据，一层以上不行');
console.log(newPerson2)

// 3，使用Object.create()方法
let newPerson3 = {}
ObjectCopy(person, newPerson3)
newPerson3.name = 'lyc'
function ObjectCopy(targetObj, copy) {
    let obj = copy || {}
    for (let i in targetObj) {
        let prop = targetObj[i]
        if (prop === obj) {
            continue
        }
        if (typeof prop === 'object') {
            obj[i] = prop.constructor === Array ? []: Object.create(prop)
        } else {
            obj[i] = prop
        }
        return obj
    }
}
console.log('这里是用Object.create拷贝后的对象');
console.log(newPerson3)


// 4，for循环
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        if(prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : {}; // constructor返回对创建prop的数组函数的引用
            arguments.callee(prop, obj[i]); // arguments.callee的内部的指针始终指向这个函数，和函数名就解耦了耦合。一般用于递归的时候
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
let newPerson4 = {}
deepClone(person, newPerson4);
newPerson4.dance.today = true
console.log('这里是用for循环转换后的对象');
console.log(newPerson4);

// 5，jquery 有提供一个$.extend可以用来做 Deep Copy。

var obj2 = $.extend(true, {}, person);
obj2.dance.today= [2,4,6]
console.log('这里是用jq的extend方法copy后的对象');
console.log(obj2)

// 6，lodash  另外一个很热门的函数库lodash，也有提供_.cloneDeep用来做 Deep Copy。
let _ = require('lodash')
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
// // false

// class 的情况
// immutatable
// lodash和jq的内部实现不一样