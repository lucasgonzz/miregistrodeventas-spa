<template>
    <div id="app">
        <div
        v-if="auth_loading">
            <logo-loading></logo-loading>
        </div>
        <div
        v-else>
            <select-address></select-address>
            <nav-component></nav-component>
            <b-container 
            :class="container_class"
            fluid>
                <b-button
                v-if="new_version && current_page != 'Login'"
                @click="refreshApp"
                class="m-b-20"
                variant="primary">
                    <i class="icon-download"></i>
                    Hay una nueva version disponible, click para actualizar
                </b-button>
                <transition name="fade" mode="out-in">
                    <router-view/> 
                </transition>
            </b-container>
        </div>
    </div>
</template>
<script>
import SelectAddress from './components/common/select-address/Index'
import NavComponent from './components/nav/NavComponent'
import NavHome from './components/home/components/Nav'
import LogoLoading from '@/components/common/LogoLoading'
import web_sockets from '@/mixins/web_sockets'

import app from '@/mixins/app'
import online from '@/mixins/online'
export default {
    metaInfo: {
        title: 'ComercioCity',
        meta: [
          { vmid: 'description', name: 'description', content: 'ComercioCity. Sistema de administracion y contabilidad online' }
        ],
        htmlAttrs: {
            lang: 'es',
            amp: true
        }
    },
    components: {
        SelectAddress,
        NavComponent,
        NavHome,
        LogoLoading,
    },
    mixins: [web_sockets, online, app],
    computed: {
        authenticated() {
            return this.$store.state.auth.authenticated
        },
        route() {
            return this.$route.path
        },
        container_class() {
            if (this.current_page != 'Maps' && this.current_page != 'Online' && this.current_page != 'Login' && this.current_page != 'Home') {
                return 'p-b-20'
            }
            return ''
        }
    },
    watch: {
        route() {
            this.setView()
        },
        authenticated() {
            if (this.authenticated && this.$route.name != 'Subscription') {
                console.log('watch de authenticated')
                this.callMethods()
            } 
        }
    },
    created() {
        document.addEventListener(
            'swUpdated', this.showRefreshUI, { once: true }
        );
        this.redirectIfWww()
        this.$store.dispatch('auth/me')
        .then(() => {
            this.setView()
            this.$store.dispatch('plans/getPlans')
        })
    },
    data() {
        return {
            new_version: false,
        }
    },
    methods: {
        showRefreshUI (e) {
            console.log('Se recibio el evento desde App.vue')
            this.new_version = true
        },
        refreshApp () {
            console.log('Se llamo refreshApp.')
            location.reload(true)
        },
        redirectIfWww() {
            if (location.href.indexOf("www.") > -1) {
                console.log('tiene www')
                location.replace(process.env.VUE_APP_APP_URL);
            }
        },
        setView() {
            if (!this.authenticated) {
                if (this.$route.name != 'PreguntasFrecuentes') {
                    if (this.$route.name != 'Home' && this.$route.name != 'Login') {
                        this.$router.push({name: 'Home'})
                    }
                }
            } else {
                let route = this.$route.path
                if (route == '/' || 
                    route == '/login' || 
                    ! this.hasPermissionForRoute(route)) {
                    this.redirect()
                }
            }
        },
        checkAddress() {
            setTimeout(() => {
                if (this.user.addresses.length >= 2) {
                    console.log('mostrando address')
                    this.$bvModal.show('select-address')
                }
            }, 1000)
        },
        redirect() {
            let route = ''
            if (this.user.status == 'super') {
                this.$router.replace({name: 'Super', params: {view: 'usuarios'}})
            } else {
                if (this.user.trial_expired) {
                    route = '/prueba-terminada'
                } else if (this.can('sale.store')) {
                    route = '/vender/remito'
                } else if (this.can('article.store')) {
                    route = '/ingresar'
                } else if (this.can('article.index')) {
                    route = '/listado'
                } else if (this.can('sale.index')) {
                    route = '/ventas'
                } else if (this.can('online.orders')) {
                    route = '/tienda-online/pedidos'
                } else if (this.can('online.questions')) {
                    route = '/tienda-online/preguntas'
                } else if (this.can('online.buyers')) {
                    route = '/tienda-online/clientes'
                } else if (this.can('online.messages')) {
                    route = '/tienda-online/mensajes'
                } else if (this.can('online.cupons')) {
                    route = '/tienda-online/cupones'
                } else if (this.can('online.calls')) {
                    route = '/tienda-online/llamadas'
                } else if (this.can('budget.index') || this.can('budget.store')) {
                    route = '/produccion/presupuestos'
                } else if (this.can('order_production.index')) {
                    route = '/produccion/ordenes-de-produccion'
                } else if (this.can('provider.index')) {
                    route = '/proveedores/lista'
                } else if (this.can('provider_order.create') || this.can('provider_order.index')) {
                    route = '/proveedores/pedidos'
                }
                console.log('redireccionando a: '+route)
                this.$router.replace(route)
            }
        },
        async callMethods() {
            if (this.is_commerce) {
                console.log('Es un comercio')
                this.$store.commit('auth/setLoading', true)
                this.$store.commit('auth/setMessage', 'Cargando articulos')
                await this.$store.dispatch('article/getModels')
                await this.$store.dispatch('article/getInactiveModels')
                this.$store.commit('auth/setMessage', 'Cargando ventas')
                await this.$store.dispatch('sale/getModels')
                if (this.hasExtencion('budgets') && this.can('budget.index')) {
                    this.$store.commit('auth/setMessage', 'Cargando presupuestos')
                    this.$store.dispatch('budget/getModels')
                    this.$store.dispatch('budget_status/getModels')
                }
                if (this.hasExtencion('order_productions') && this.can('order_production.index')) {
                    this.$store.commit('auth/setMessage', 'Cargando ordenes de produccion')
                    this.$store.dispatch('order_production/getModels')
                    this.$store.dispatch('order_production_status/getModels')
                }
                if (this.hasExtencion('combos')) {
                    this.$store.dispatch('combos/getModels')
                }
                this.$store.commit('auth/setMessage', 'Cargando tipos de precios')
                await this.$store.dispatch('price_type/getModels')
                if (this.hasExtencion('providers')) {
                    this.$store.commit('auth/setMessage', 'Cargando proveedores')
                    await this.$store.dispatch('provider/getModels')
                    this.$store.commit('auth/setMessage', 'Cargando pedidos de proveedores')
                    await this.$store.dispatch('provider_order/getModels')
                }
                this.$store.commit('auth/setMessage', 'Cargando localidades')
                await this.$store.dispatch('location/getModels')
                if (this.has_online) {
                    this.$store.commit('auth/setMessage', 'Cargando categorias')
                    await this.$store.dispatch('categories/getCategories')
                    this.$store.commit('auth/setMessage', 'Cargando subcategorias')
                    await this.$store.dispatch('sub_categories/getSubCategories')
                    this.$store.commit('auth/setMessage', 'Cargando etiquetas')
                    await this.$store.dispatch('tags/getTags')
                    this.$store.commit('auth/setMessage', 'Cargando colores')
                    await this.$store.dispatch('colors/getColors')
                    this.$store.commit('auth/setMessage', 'Cargando talles')
                    await this.$store.dispatch('sizes/getSizes')
                    this.$store.commit('auth/setMessage', 'Cargando marcas')
                    await this.$store.dispatch('brand/getModels')
                }
                if (this.can('client.index') || this.can('sale.store')) {
                    this.$store.commit('auth/setMessage', 'Cargando clientes')
                    await this.$store.dispatch('client/getModels')
                    await this.$store.dispatch('current_acount_payment_methods/getModels')
                }
                // if (this.can('afip_tickets')) {
                    this.$store.commit('auth/setMessage', 'Cargando iva')
                    await this.$store.dispatch('iva/getModels')
                    this.$store.commit('auth/setMessage', 'Cargando condiciones de iva')
                    await this.$store.dispatch('iva_condition/getModels')
                // }
                if (this.can('employee')) {
                    this.$store.commit('auth/setMessage', 'Cargando empleados')
                    await this.$store.dispatch('employee/getModels')
                }
                if (this.can('article.index')) {
                    this.$store.commit('auth/setMessage', 'Cargando listas de precios')
                    await this.$store.dispatch('prices_lists/getPircesLists')
                } 
                if (this.has_online) {
                    this.$store.commit('auth/setMessage', 'Cargando metodos de pago')
                    await this.$store.dispatch('payment_methods/getModels')
                    this.$store.commit('auth/setMessage', 'Cargando tipos de metodos de pago')
                    await this.$store.dispatch('payment_method_types/getModels')
                    this.$store.commit('auth/setMessage', 'Cargando zonas de envio')
                    await this.$store.dispatch('delivery_zones/getModels')
                    this.$store.commit('auth/setMessage', 'Cargando titulos')
                    await this.$store.dispatch('titles/getTitles')
                    this.$store.commit('auth/setMessage', 'Cargando condiciones')
                    await this.$store.dispatch('condition/getModels')
                    this.$store.commit('auth/setMessage', 'Cargando dias de trabajo')
                    await this.$store.dispatch('workdays/getWorkdays')
                    this.$store.commit('auth/setMessage', 'Cargando horarios de trabajo')
                    await this.$store.dispatch('schedules/getSchedules')
                    this.getOrdersAndQuestions()
                    this.getBuyers()
                    this.getActiveCupons()
                    this.getCalls()
                    this.listenChannels()
                }

                this.$store.commit('auth/setMessage', 'Cargando descuentos')
                await this.$store.dispatch('discount/getModels')
                this.$store.commit('auth/setMessage', 'Cargando vendedores')
                await this.$store.dispatch('seller/getModels')
                this.$store.commit('auth/setMessage', 'Cargando comisiones')
                await this.$store.dispatch('commissioners/getCommissioners')
                this.$store.commit('auth/setMessage', 'Cargando tipos de venta')
                await this.$store.dispatch('sale_types/getSaleTypes')

                this.$store.commit('vender/setSaleType', 1)
                this.$store.commit('auth/setLoading', false)
                this.$store.commit('auth/setMessage', '')
                this.checkAddress()
                this.setSubCategoriesInVender()
            } else if (this.is_super) {
                console.log('Es super')
                this.$store.dispatch('super/getCommerces')
                this.$store.dispatch('super/getPlans')
                this.$store.dispatch('super/getPermissions')
            }
        }
    }
}
</script>
<style lang="sass">
@import "./sass/fonts/styles.css"
@import "@/sass/app.sass"
#app 
    background: #F3F3F3
    font-family: Roboto, Nunito, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    min-height: 100vh
.fade-enter-active,
.fade-leave-active 
    transition-duration: 0.3s
    transition-property: opacity
    transition-timing-function: ease


.fade-enter,
.fade-leave-active 
    opacity: 0
</style>
