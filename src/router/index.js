import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Vender from '../views/Vender.vue'
import Ingresar from '../views/Ingresar.vue'
import Listado from '../views/Listado.vue'
import Ventas from '../views/Ventas.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/vender',
    name: 'Vender',
    component: Vender
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
    path: '/ventas',
    name: 'Ventas',
    component: Ventas
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
