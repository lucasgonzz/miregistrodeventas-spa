import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Super from '../views/Super.vue'
import Vender from '../views/Vender.vue'
import Ingresar from '../views/Ingresar.vue'
import Listado from '../views/Listado.vue'
import Ventas from '../views/Ventas.vue'
import Empleados from '../views/Empleados.vue'
import Online from '../views/Online.vue'
import Configuration from '../views/Configuration.vue'
import Maps from '../views/Maps.vue'
import PruebaTerminada from '../views/PruebaTerminada.vue'
import PreguntasFrecuentes from '../views/PreguntasFrecuentes.vue'
import store from '@/store'

function hasPermissionTo(permission_name) {
    if (store.state.auth.authenticated) {
        let user = store.getters['auth/user']
        let has_permission = false
        if (user.roles) {
            user.roles.forEach(rol => {
                if (rol.name == 'Super Admin') {
                    has_permission = true
                }
            })
            if (!has_permission) {
                user.permissions.forEach(permission => {
                    if (permission.name == permission_name) {
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
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/super/:view',
        name: 'Super',
        component: Super,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/vender',
        name: 'Vender',
        component: Vender,
    },
    {
        path: '/ingresar',
        name: 'Ingresar',
        component: Ingresar,
    },
    {
        path: '/listado',
        name: 'Listado',
        component: Listado,
    },
    {
        path: '/ventas',
        name: 'Ventas',
        component: Ventas,
    },
    {
        path: '/ventas-completas',
        name: 'VentasAll',
        component: Ventas,
    },
    {
        path: '/empleados',
        name: 'Empleados',
        component: Empleados,
    },
    {
        path: '/tienda-online/:view/:chat_id?',
        name: 'Online',
        component: Online,
    },
    {
        path: '/configuracion',
        name: 'Configuration',
        component: Configuration,
    },
    {
        path: '/mapa',
        name: 'Maps',
        component: Maps,
    },
    {
        path: '/prueba-terminada',
        name: 'PruebaTerminada',
        component: PruebaTerminada
    },
    {
        path: '/preguntas-frecuentes',
        name: 'PreguntasFrecuentes',
        component: PreguntasFrecuentes
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
