import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/api/auth.js';
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
      path: '/note/:noteId',
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
      component: Trash
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    console.log('要去登录页')
    next()
  } else {
    console.log('验证有没有登录')
    Auth.hx_getInfo().then(res => {
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