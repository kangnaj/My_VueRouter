# Vue-Router ——> 前端路由

## 前端路由

前端路由：保证只有一个HTML,每个视图对应一个url,与用户交互不会刷新页面

## 实现原理

监测URL变化，通过拦截URL然后解析匹配路由规则

## hash路由

hash,基于location.hash来实现,是指URL中#后面的，**改变 URL 中的 hash 部分不会引起页面刷新**

通过hashchange事件来监听URL的变化

改变URL的方式：

- 通过浏览前进后退改变URL
- 通过<a>标签改变URL
- 通过window.location改变URL

## history路由

history提供了pushState和replaceState两方法来改URL,并且不会引起页面刷新

history提供了popState事件来监听

- 通过浏览器前进后退改变 URL 时会触发 popstate 事件
- 通过pushState/replaceState或`<a>`标签改变 URL 不会触发 popstate 事件。
- 好在我们可以拦截 pushState/replaceState的调用和`<a>`标签的点击事件来检测 URL 变化
- 通过js 调用history的back，go，forward方法课触发该事件

## Vue-router原理

$router路由对象，$route当前路由信息对象

Vue提供了插件注册机制是，每个插件都需要实现一个静态的 `install`方法，当执行 `Vue.use` 注册插件的时候，就会执行 `install` 方法

Vue.mixin混入两个生命周期beforeCreate和destroyed

**使用 Vue.util.defineReactive 将实例的 _route 设置为响应式对象**,**而 push, replace 方法会主动更新属性 _route**,**而 go，back，或者点击前进后退的按钮则会在 onhashchange 或者 onpopstate 的回调中更新 _route。_route 的更新会触发 RoterView 的重新渲染。**
