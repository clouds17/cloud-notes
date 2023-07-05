import Vue from 'vue'
import $store from '@/store/index.js';
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/components/Login.vue')
    },
    {
      path: '/notebooks',
      alias: '/',
      component: () => import('@/components/NotebookList.vue')
    },
    {
      path: '/note',
      component: () => import('@/components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('@/components/Trash.vue')
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