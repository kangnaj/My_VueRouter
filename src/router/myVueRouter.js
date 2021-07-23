/*
 * 2021-07-22 15:00:39
 * @create by: zj
 * @Description: 手写 vue Router
 */
// $router是VueRouter的实例对象，$route是当前路由对象，也就是说$route是$router的一个属性
import Vue from "vue"
class myVueRouter {
  constructor() {

  }
}

myVueRouter.install = function (v) {
  const vm = v

  Vue.component('router-link', {
    render(h) {
      return h('a', {}, '首页')
    }
  })
  Vue.component('router-view', {
    render (h) {
      return h('h1', {}, '首页视图')
    }
  })
}

export default myVueRouter