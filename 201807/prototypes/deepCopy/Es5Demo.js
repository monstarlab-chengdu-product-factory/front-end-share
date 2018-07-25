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
// var a = [[1, 2, 3], 4, [5, 6]]
// b = $.extend([], a)
// console.log("a: ",a)
// console.log("b: ",b)
// 此次不表


// ES6扩展运算符实现数组的深拷贝
let eArrary = [...dArrary]
eArrary[1]='10'
console.log(eArrary)

// 二、对象 ES5 的深拷贝写法

// 1，for 循环(这个例子只能拷贝第一层)
var person = {
    name: '李宇春',
    sex: 'girl',
    old: '18',
    dance:{today:false, tommorrw:true}
}
let newPerson = deepCopy(person, {})
function deepCopy(obj,copy){
    for(let i in obj){
        if(typeOf obj[i] === 'object') {       //判断是否为对象
            deepCopy(obj[i],copy[i])//回调深拷贝函数
        }else{
            copy[i] = obj[i]          //不是对象直接复制
        }
    }
    return copy
}
// function copyObj(obj) {
//     let newObj = {}
//     for(let key in obj){
//         newObj[key] = obj[key]
//         if (typeof obj[key] === 'object') {
//             copyObj(obj[key])
//         }
//     }
//     return newObj
// }
newPerson.dance.today=true
console.log(person);
console.log(newPerson);
