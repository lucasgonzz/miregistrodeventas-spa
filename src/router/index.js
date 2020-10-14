import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Super from '../views/Super.vue'
import Vender from '../views/Vender.vue'
import Ingresar from '../views/Ingresar.vue'
import Listado from '../views/Listado.vue'
import Ventas from '../views/Ventas.vue'
import Empleados from '../views/Empleados.vue'
import Online from '../views/Online.vue'
import PruebaTerminada from '../views/PruebaTerminada.vue'
import store from '@/store'

function hasPermissionTo(permission_slug) {
    if (store.state.auth.authenticated) {
        let user = store.getters['auth/user']
        let has_permission = false
        if (user.roles) {
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
        }
        return has_permission
    } 
    return true
}
function trialFinish() {
    let user = store.getters['auth/user']
    if (user.status == 'trial' && new Date(user.expire) < new Date()) {
        return false
    }
    return false
}
Vue.use(VueRouter)

    const routes = [
    // {
    //     path: '/',
    //     redirect: () => {
    //         console.log('redirect')
    //         if (store.state.auth.authenticated) {
    //             let user = store.getters['auth/user']
    //             let route
    //             if (trialFinish()) {
    //                 route = '/prueba-terminada'
    //             } else {
    //                 if (user.admin_id) {
    //                     if (hasPermissionTo('sale.create')) {
    //                         route = '/vender'
    //                     } else if (hasPermissionTo('article.create')) {
    //                         route = '/ingresar'
    //                     } else if (hasPermissionTo('article.index')) {
    //                         route = '/listado'
    //                     } else {
    //                         route = '/ventas'
    //                     }
    //                 } else {
    //                     if (user.status == 'super') {
    //                         route = '/super'
    //                     } else {
    //                         route = '/admin'
    //                     }
    //                 }
    //             }
    //             return route
    //         } else {
    //             return '/login'
    //         }
    //     }
    // },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (from, to, next) => {
            if (store.getters['auth/authenticated']) {
                next('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/super',
        name: 'Super',
        component: Super,
        beforeEnter: (from, to, next) => {
            let user = store.getters['auth/user']
            if (user.status == 'super') {
                next()
            } else {
                next('/') 
            }
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        beforeEnter: (from, to, next) => {
            let user = store.getters['auth/user']
            if (user.status == 'admin') {
                next()
            } else {
                next('/') 
            }
        }
    },
    {
        path: '/vender',
        name: 'Vender',
        component: Vender,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('sale.create') && !trialFinish()) {
                next()
            } else {
                if (trialFinish()) {
                    next({name: 'PruebaTerminada'})
                }
                next('/')
            }
        }
    },
    {
        path: '/ingresar',
        name: 'Ingresar',
        component: Ingresar,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('article.create') && !trialFinish()) {
                next()
            } else {
                if (trialFinish()) {
                    next({name: 'PruebaTerminada'})
                }
                next('/')
            }
        }
    },
    {
        path: '/listado',
        name: 'Listado',
        component: Listado,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('article.index') && !trialFinish()) {
                next()
            } else {
                if (trialFinish()) {
                    next({name: 'PruebaTerminada'})
                }
                next('/')
            }
        }
    },
    {
        path: '/ventas',
        name: 'Ventas',
        component: Ventas,
        beforeEnter: (from, to, next) => {
            if (hasPermissionTo('sale.index') && !trialFinish()) {
                next()
            } else {
                if (trialFinish()) {
                    next({name: 'PruebaTerminada'})
                }
                next('/')
            }
        }
    },
    {
        path: '/empleados',
        name: 'Empleados',
        component: Empleados,
        beforeEnter: (from, to, next) => {
            if (!trialFinish()) {
                next()
            } else {
                if (trialFinish()) {
                    next({name: 'PruebaTerminada'})
                }
                next('/')
            }
        }
    },
    {
        path: '/tienda-online',
        name: 'Online',
        component: Online,
    },
    {
        path: '/prueba-terminada',
        name: 'PruebaTerminada',
        component: PruebaTerminada
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
