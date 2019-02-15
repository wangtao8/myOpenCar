import Vue from 'vue'
import Router from 'vue-router'
import a from '../components/a'
import b from '../components/b'
import d from '../components/d'
import vnode from '../components/vnode'
import danlie from '../components/danlie'
import danlie2 from '../components/danlie2'

Vue.use(Router)

export const oldRouter = [//不需要权限的路由
  {
    path: '/',
    name: 'd',
    component: d
  }, {
    path: '/danlie2',
    name: 'danlie2',
    component: danlie2
  }
]

export const superAdmin = [//需要权限的路由
  {
    path: '/a',
    name: 'a',
    component: a
  },
  {
    path: '/b',
    name: 'b',
    component: b
  },
  {
    path: '/vnode',
    name: 'vnode',
    component: vnode
  },
  {
    path: '/danlie',
    name: 'danlie',
    component: danlie
  }
]

export default new Router({
  routes: oldRouter//默认使用不需要权限的
})
