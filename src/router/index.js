import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store'
import template from '@/views/template/Template'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: template,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },    
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await store.dispatch('authentication/isAuthenticated')
  const namePage = to.name || ''
  const isLoginPage = namePage.toLocaleLowerCase() === 'login'

  if(!isAuthenticated && !isLoginPage) {
    await store.dispatch('authentication/requestUser')
  }

  next();
})

export default router
