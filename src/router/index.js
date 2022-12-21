import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Vender from '../views/Vender.vue'
import Produccion from '../views/Produccion.vue'
import Presupuestos from '../views/Presupuestos.vue'
import Ingresar from '../views/Ingresar.vue'
import Listado from '../views/Listado.vue'
import Ventas from '../views/Ventas.vue'
import Clientes from '../views/Clientes.vue'
import Empleados from '../views/Empleados.vue'
import Online from '../views/Online.vue'
import Proveedores from '../views/Proveedores.vue'
import Configuration from '../views/Configuration.vue'
import Maps from '../views/Maps.vue'
import PruebaTerminada from '../views/PruebaTerminada.vue'
import PreguntasFrecuentes from '../views/PreguntasFrecuentes.vue'
import Subscription from '../views/Subscription.vue'
import store from '@/store'

// SUPER
import SuperUsers from '../views/super/Users'
import SuperPlans from '../views/super/Plans'
import SuperBudgets from '../views/super/Budgets.vue'  

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
        path: '/super/usuarios',
        name: 'SuperUsers',
        component: SuperUsers,
    },
    {
        path: '/super/planes',
        name: 'SuperPlans',
        component: SuperPlans,

    },
    {
        path: '/super/presupuestos',
        name: 'SuperBudgets',
        component: SuperBudgets,

    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/vender/:view?',
        name: 'Vender',
        component: Vender,
    },
    {
        path: '/produccion/:view?/:sub_view?',
        name: 'Produccion',
        component: Produccion,
    },
    {
        path: '/presupuestos/:view?/:sub_view?',
        name: 'Presupuestos',
        component: Presupuestos,
    },
    {
        path: '/ingresar/:view?/:sub_view?',
        name: 'Ingresar',
        component: Ingresar,
    },
    {
        path: '/listado',
        name: 'Listado',
        component: Listado,
    },
    {
        path: '/ventas/:view?/:sub_view?',
        name: 'Ventas',
        component: Ventas,
    },
    {
        path: '/clientes',
        name: 'Clientes',
        component: Clientes,
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
        path: '/proveedores/:view',
        name: 'Proveedores',
        component: Proveedores,
    },
    {
        path: '/configuracion/:view/:sub_view?',
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
    {
        path: '/suscripcion/:view',
        name: 'Subscription',
        component: Subscription
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
