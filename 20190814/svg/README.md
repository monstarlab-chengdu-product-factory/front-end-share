# SVG 和 SVG的动画的实现

## 什么是SVG
+ SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
+ SVG 用来定义用于网络的基于矢量的图形
+ SVG 使用 XML 格式定义图形
+ SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
+ SVG 是万维网联盟的标准
+ SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体

## SVG 是 W3C 标准推荐
SVG 于 2003 年 1 月 14 日成为 W3C 推荐标准。

## SVG 实例
```
<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="red" fill="grey" />
  <circle cx="150" cy="50" r="4" stroke="red" fill="grey" />

  <svg viewBox="0 0 10 10" x="200" width="100">
    <circle cx="5" cy="5" r="4" stroke="red" fill="grey" />
  </svg>
</svg>
```
```
<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     width="150" height="100" viewBox="0 0 3 2">

  <rect width="1" height="2" x="0" fill="#008d46" />
  <rect width="1" height="2" x="1" fill="#ffffff" />
  <rect width="1" height="2" x="2" fill="#d2232c" />
</svg>
```

## SVG 属性

### 专有属性
+ version
+ baseProfile
+ x
+ y
+ width
+ height
+ preserveAspectRatio
+ contentScriptType
+ contentStyleType
+ viewBox

### 全局属性
+ 条件处理属性
+ 核心属性
+ 文档事件属性
+ 图形事件属性
+ 外观属性
+ class
+ style
+ externalResourcesRequired

## SVG 动画与交互
SVG跟HTML一样有可被 JavaScript 访问的文档对象模型（DOM）和事件。这允许开发者创建丰富的动画和可交互的图像。

### SVG Animation
在 SVG 中，如果我们想实现一个动画效果，可以使用 CSS，JS，或者直接使用 SVG 中自带的 animate 元素添加动画。

---

使用 CSS 的话，有两种选择一种是通过 style 直接内联在里面，另外是直接使用相关的动画属性-- transform。
```
<use id="star" class="starStyle" xlink:href="#starDef"
       transform="translate(100, 100)"
       style="fill: #008000; stroke: #008000"/>
```
```
<rect x="10" y="10" width="200" height="20" stroke="black" fill="none">
  <animate
    attributeName="width"
    attributeType="XML"
    from="200" to="20"
    begin="0s" dur="5s"
    fill="freeze" />
</rect>
```
```
<rect x="-10" y="-10" width="20" height="20"
    style="fill: #ff9; stroke: black;">
    <animateTransform attributeType="XML"
      attributeName="transform" type="scale"
      from="1" to="4 2"
      begin="0s" dur="4s" fill="freeze"/>
</rect>
```
+ animate: 相当于 CSS 中的 transition
+ animateTransform: 相当于 CSS 中的 transform
![动画](https://user-gold-cdn.xitu.io/2017/5/2/7a64e360acee1f930346f5798c14ee27?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### animateMotion
animateMotion 大致的属性和 animate 差不多，不过，它还拥有自己特有的属性，比如 keyPoints、rotate、path 等。不过，calcMode 在 AM(animateMotion) 中的默认属性由，linear 变为 paced。
```
<g>
  <rect x="0" y="0" width="30" height="30" style="fill: #ccc;"/>
  <circle cx="30" cy="30" r="15" style="fill: #cfc; stroke: green;"/>
  <animateMotion from="0,0" to="60,30" dur="4s" fill="freeze"/>
</g>
```
![动画](https://user-gold-cdn.xitu.io/2017/5/2/64cc0c9a4dfc485bdcdde5e948f24365.gif?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 矩阵动画
### 线条动画
SVG 中的线条动画常常用作过渡屏（splash screen）中,或者，一些比较炫酷的 LOGO 中
![动画](https://user-gold-cdn.xitu.io/2017/5/2/260493a6b5542d6eacbdd0a5122122ac.gif?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## SVG 兼容性
+ Chrome 1.0
+ Firefox (Gecko) 1.5(1.8)
+ IE 9.0
+ Opera 8.0
+ Safari 3.0.4

## 引用链接
https://juejin.im/entry/5907dd4cda2f60005d0fd6c3