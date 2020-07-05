import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Ingresar from '../views/Ingresar.vue'
import Listado from '../views/Listado.vue'

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ingresar',
    name: 'Ingresar',
    component: Ingresar
  },
  {
    path: '/listado',
    name: 'Listado',
    component: Listado
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
