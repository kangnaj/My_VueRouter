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

