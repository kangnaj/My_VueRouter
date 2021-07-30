/*
 * 2021-07-28 17:00:58
 * @create by: zj
 * @Description:  手写vuex
 */
import Vue from 'vue'
let install = function (_Vue) {
  if (Vue && _Vue === Vue) {
    return
  }
  Vue = _Vue
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

class Store {
  construct(options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    // 实现 getter
    let getters = options.getters || {}
    this.getters = {}
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state)
        }
      })
    })
    //实现 mutations
    let mutations = options.mutations || {}
    this.mutations = {}
    Object.keys(mutations).forEach(mutationName => {
      this.mutations[mutationName] = (arg) => {
        mutations[mutationName](this.state, arg)
      }
    })

    let actions = options.actions
    this.actions = {}
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = (arg) => {
        actions[actionName](this, arg)
      }
    })
  }
  // dispatch 提交 actions
  dispatch(method, arg) {
    this.actions[method](arg)
  }
  // commit 提交 mutations
  commit(method, arg) {
    this.mutations[method](arg)
  }
  //新增代码  获取state
  get state() {
    return this.vm.state
  }
}

let Vuex = {
  Store,
  install
}

export default Vuex