/*
 * 2021-07-22 15:00:39
 * @create by: zj
 * @Description: 手写 vue Router
 */
// 父组件和子组件的执行顺序？
// 父beforeCreate-> 父created -> 父beforeMounte -> 子beforeCreate ->子create ->子beforeMount ->子 mounted -> 父mounted
// $router是VueRouter的实例对象，$route是当前路由对象，也就是说$route是$router的一个属性

// 用一个对象来表示 当前的路径状态
class HistoryRoute {
  constructor () {
    this.current = null
  }
}
class myVueRouter {
  constructor(options) {
    this.mode = options.mode || "hash"
    this.routes = options.routes || [] //传递的路由是个数组

    this.routesMap = this.createMap(this.routes) //建立 path: compont 一一对应 的键值对

    this.history = new HistoryRoute()

    this.init()//初始化
  }

  init () {
    if (this.mode === "hash") {
      location.hash ? "" : location.hash = "/";
      window.addEventListener ("load", () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      location.pathname ? "" : location.pathname = "/"
      window.addEventListener("load", () => {
        this.history.current = location.pathname
      })
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname
      })
    }
  }

  createMap (routes) { // 路径对应组件
    return routes.reduce((pre,cur) => {
      pre[cur.path] = cur.component
      return pre
    }, {})
  }
}

let Vue
myVueRouter.install = function (v) {
  Vue = v
  Vue.mixin ({
    // 为什么是beforeCreate而不是created呢？因为如果是在created操作的话，$options已经初始化好了
    beforeCreate () {
      if (this.$options && this.$options.router) { // 根组件， 有router选项new Vue({ router, render: h => h(App) }).$mount('#app')
        this._root = this //把当前实例挂载到_root上
        this._router = this.$options.router
        Vue.util.defineReactive(this,"_route",this._router.history)
      } else {  //子组件 ， 将_root根组件挂载到子组件
        this._root = this.$parent && this.$parent._root
      }

      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        }
      })

      Object.defineProperty(this, "$route", {
        get() {
          return this._root._router.history.current
        }
      })
    }
  })
  Vue.component('router-link', {
    props:{
      to:String
  },
    render(h) {
      const mode = this._self._root._router.mode;
      let to = mode === "hash" ? "#" + this.to : this.to
      return h('a', {
        attrs: {href:to},
        on: {
          click: (e) => {
            if (mode === "history") {
              e.preventDefault()
              this._self._root._router.history.current = to
            }
          }
        }
      },
      this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render (h) {
      let current = this._self._root._router.history.current
      let routeMap = this._self._root._router.routesMap;
      console.log(routeMap,current,"current");
      return h(routeMap[current])
    }
  })
}

export default myVueRouter