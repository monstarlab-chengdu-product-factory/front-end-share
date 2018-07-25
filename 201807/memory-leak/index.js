// Case:1

function foo(arg) {
  bar = "this is a hidden global variable"
}
// In fact
function foo(arg) {
  window.bar = "this is an explicit global variable"
}

// Another way in which an accidental global variable can be created
function foo() {
  this.variable = "potential accidental global"
}

// Foo called on its own, this points to the global object (window)
// rather than being undefined
foo()

// Solution:
// 'use strict'

// Case:2
var someResource = getData()
setInterval(function () {
  var node = document.getElementById('Node')
  if (node) {
    // Do stuff with node and someResource.
    node.innerHTML = JSON.stringify(someResource)
  }
}, 1000)

// Solution
var init = self.setInterval(function () {
// Do stuff
}, 1000)
// When needn't
clearInterval(init)

// Explicitly remove these observers before the object is disposed
var element = document.getElementById('button')

function onClick(event) {
  element.innerHtml = 'text'
}

element.addEventListener('click', onClick)
// Do stuff
element.removeEventListener('click', onClick)
element.parentNode.removeChild(element)
// Now when element goes out of scope,
// both element and onClick will be collected even in old browsers that don't
// handle cycles well.

// Case3:
var elements = {
  button: document.getElementById('button'),
  image: document.getElementById('image'),
  text: document.getElementById('text')
};
function doStuff() {
  image.src = 'http://some.url/image'
  button.click()
  console.log(text.innerHTML)
  // Much more logic
}
function removeButton() {
  // The button is a direct child of body.
  document.body.removeChild(document.getElementById('button'))
  // At this point, we still have a reference to #button in the global
  // elements dictionary. In other words, the button element is still in
  // memory and cannot be collected by the GC.
}

// Case:4
//Anonymous functions that capture variables from parent scopes
var theThing = null
var replaceThing = function () {
  var originalThing = theThing

  var unUsed = function () {
    if (originalThing)
      console.log("hi")
  }

  theThing = {
    longStr: new Array(1000000).join('*'), //!!
    someMethod: function () {
      console.log(someMessage)
    }
  }
}
setInterval(replaceThing, 1000)