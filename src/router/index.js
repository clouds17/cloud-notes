import Vue from 'vue'
import $store from '@/store/index.js';
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import Trash from '@/components/Trash'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component: NotebookList
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: Trash
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    console.log('要去登录页')
    next()
  } else {
    $store.dispatch('checkLogin_actions')
      .then(res => {
          if (!res.isLogin) {
            console.log('哦吼，还没登录哄')
            next('/login')
          } else {
            console.log('原来登录了丫')
            next()
          }
      })
  }
})

export default router