/*
 * 2021-07-28 15:50:39
 * @create by: zj
 * @Description: vuex原理
 */
// src/store.js
import Vue from 'vue'

// Vue.use(vuex) 执行install方法
export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

function applyMixin(Vue) {
  Vue.mixin({ // 全局混入 beforeCreate 钩子
    beforeCreate: vuexInit,
  })
}

function vuexInit() {
  const options = this.$options //当前 option
  if (options.store) { //  根组件
    this.$store = typeof options.store === 'function' ?
      options.store() :
      options.store
  } else if (options.parent && options.parent.$store) { // 子组件
    this.$store = options.parent.$store
  }
}

// new Vuex.Store({})
class Store {
  constructor(options = {}) {
    const {
      plugin = [],
        strict = false
    } = options
    
    const store = this
    const {
      dispatch,
      commit
    } = this
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    resetStoreVM(this, state)
  }
  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    
  }
}


// 本质就是将我们传入的state作为一个隐藏的vue组件的data,
// 也就是说，我们的commit操作，本质上其实是修改这个组件的data值，
// 结合上文的computed,修改被defineReactive代理的对象值后

function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })
  const silent = Vue.config.silent
  Vue.config.silent = true
  // new Vue。通过 Vue自己的双向绑定然后注入给
  store._vm = new Vue({  // store._vm.$data.$$state === store.state
    data: {
      $$state: state
    },
    computed
  })
}
function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
