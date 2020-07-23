import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Vender from '../views/Vender.vue'
import Ingresar from '../views/Ingresar.vue'
import Listado from '../views/Listado.vue'
import Ventas from '../views/Ventas.vue'
import Empleados from '../views/Empleados.vue'
import store from '@/store'

function hasPermissionTo(permission_slug) {
    let user = store.getters['auth/user']
    let has_permission = false
    user.roles.forEach(rol => {
        if (rol.slug == 'owner') {
            has_permission = true
        }
    })
    if (!has_permission) {
        user.permissions.forEach(permission => {
            if (permission.slug == permission_slug) {
                has_permission = true
            }
        })
    }
    return has_permission
}
Vue.use(VueRouter)

    const routes = [
    {
        path: '/',
        redirect: () => {
            if (store.state.auth.authenticated) {
                let user = store.getters['auth/user']
                let route
                if (user.admin_id) {
                    if (hasPermissionTo('sale.create')) {
                        route = '/vender'
                    } else if (hasPermissionTo('article.create')) {
                        route = '/ingresar'
                    } else if (hasPermissionTo('article.index')) {
                        route = '/listado'
                    } else {
                        route = '/ventas'
                    }
                } else {
                    if (user.status == 'super') {
                        route = '/super'
                    } else {
                        route = '/admin'
                    }
                }
                console.log('ruta: '+route)
                return route
            } else {
                return '/login'
            }
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (from, to, next) => {
            if (store.getters['auth/authenticated']) {
                console.log('redirigido desde login')
                next('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        // beforeEnter: (from, to, next) => {
        //     let user = store.getters['auth/user']
        //     console.log(user)
        //     if (user.status == 'admin') {
        //         next()
        //     } else {
        //         next('/') 
        //     }
        // }
    },
    {
        path: '/vender',
        name: 'Vender',
        component: Vender,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('sale.create')) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/ingresar',
        name: 'Ingresar',
        component: Ingresar,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('article.create')) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/listado',
        name: 'Listado',
        component: Listado,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('article.index')) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/ventas',
        name: 'Ventas',
        component: Ventas,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('sale.index')) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/empleados',
        name: 'Empleados',
        component: Empleados
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
