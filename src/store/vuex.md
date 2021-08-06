# Vuex

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//不是在生产环境debug为true
const debug = process.env.NODE_ENV !== 'production';
//创建Vuex实例对象
const store = new Vuex.Store({
    state:{
    },
    getters:{
    },
    mutations:{
    },
    actions:{
    }
})
export default store;
```

## vuex核心

5个核心

- state 唯一数据源,Vue 实例中的 data 遵循相同的规则
- getters 可以认为是 store 的计算属性,就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
- mutation 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,非常类似于事件,通过store.commit 方法触发
- action Action 类似于 mutation，不同在于Action 提交的是 mutation，而不是直接变更状态，Action 可以包含任意异步操作
- module 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。Vuex 允许我们将 store 分割成模块（module）

## vuex原理

Vue.use(vuex) 执行install方法，全局混入 beforeCreate钩子

new Store时

本质就是将我们传入的state作为一个隐藏的vue组件的data,

也就是说，我们的commit操作，本质上其实是修改这个组件的data值，

结合上文的computed,修改被defineReactive代理的对象值后