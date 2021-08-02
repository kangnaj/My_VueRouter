/*
 * 2021-07-30 09:28:04
 * @create by: zj
 * @Description: 
 */
  //基于基础的Vue构造器创建一个“子类”，而这个子类所传递的选项配置会和父类的选项配置进行合并,
  // 7. 实现组件继承 Vue，并调用 Vue._init 方法，进行初始化
  // Vue.extend = function (extendOptions: Object)

import Vue from 'vue'
import extendChild from './extendChild.vue'

let eChild = Vue.extend(extendChild)

export function init () {
  let instance = new eChild()
  console.log(instance,"instance");
  instance.$mount()
  // document.body.appendChild(instance.$el)
}