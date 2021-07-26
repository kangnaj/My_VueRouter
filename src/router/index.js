/*
 * 2021-07-06 17:07:30
 * @create by: zj
 * @Description: 
 */
/*
 * @Description: 
 */
import Vue from 'vue'
// import VueRouter from 'vue-router'
import myVueRouter from './myVueRouter'
import Home from '../views/Home.vue'

Vue.use(myVueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new myVueRouter({
  mode: "hash",
  routes
})

export default router
