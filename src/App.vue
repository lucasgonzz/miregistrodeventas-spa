<template>
    <div id="app">
        <div
        v-if="loading">
            <logo-loading
            :loading="loading"
            :loading_message="loading_message"></logo-loading>
        </div>
        <div
        v-else>
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
import NavComponent from './components/nav/NavComponent'
import NavHome from './components/home/components/Nav'
import LogoLoading from '@/components/common/LogoLoading'
import web_sockets from '@/mixins/web_sockets'
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
        NavComponent,
        NavHome,
        LogoLoading,
    },
    mixins: [web_sockets, online],
    computed: {
        authenticated() {
            return this.$store.state.auth.authenticated
        },
        route() {
            return this.$route.path
        },
        loading() {
            return this.$store.state.auth.loading
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
        console.log('App version 3')
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
            loading_message: '',
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
        redirect() {
            let route = ''
            if (this.user.status == 'super') {
                this.$router.replace({name: 'Super', params: {view: 'usuarios'}})
            } else {
                if (this.user.trial_expired) {
                    route = '/prueba-terminada'
                } else if (this.can('sales.store')) {
                    route = '/vender'
                } else if (this.can('articles.store')) {
                    route = '/ingresar'
                } else if (this.can('articles.index')) {
                    route = '/listado'
                } else if (this.can('sales.index')) {
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
                }
                console.log('redireccionando a: '+route)
                this.$router.replace(route)
            }
        },
        async callMethods() {
            if (this.is_commerce) {
                console.log('Es un comercio')
                this.$store.commit('auth/setLoading', true)
                this.loading_message = 'articulos'
                await this.$store.dispatch('articles/getArticles')
                this.loading_message = 'ventas'
                await this.$store.dispatch('sales/days_previus_sales/getDaysPreviusSales')
                await this.$store.dispatch('sales/getSales')
                if (this.hasExtencion('budgets')) {
                    this.loading_message = 'presupuestos'
                    this.$store.dispatch('produccion/budgets/getModels')
                }
                if (this.hasExtencion('order_productions')) {
                    this.loading_message = 'ordenes de produccion'
                    this.$store.dispatch('produccion/order_productions/getModels')
                    this.$store.dispatch('produccion/order_productions/statuses/getModels')
                }
                if (this.can('special_prices')) {
                    this.$store.dispatch('special_prices/getSpecialPrices')
                }
                if (this.hasExtencion('combos')) {
                    this.$store.dispatch('combos/getModels')
                }
                // if (this.can('providers')) {
                    this.loading_message = 'proveedores'
                    await this.$store.dispatch('providers/getModels')
                    if (this.hasExtencion('proveedores')) {
                        this.loading_message = 'pedidos de proveedores'
                        await this.$store.dispatch('providers/orders/getModels')
                    }
                // }
                // if (this.can('categories')) {
                    this.loading_message = 'categorias'
                    await this.$store.dispatch('categories/getCategories')
                    this.loading_message = 'subcategorias'
                    await this.$store.dispatch('sub_categories/getSubCategories')
                    this.loading_message = 'iconos'
                    await this.$store.dispatch('icons/getIcons')
                // }
                // if (this.can('clients')) {
                    this.loading_message = 'clientes'
                    await this.$store.dispatch('clients/getClients')
                    await this.$store.dispatch('current_acount_payment_methods/getModels')
                // }
                if (this.can('afip_tickets')) {
                    this.loading_message = 'iva'
                    await this.$store.dispatch('ivas/getModels')
                    this.loading_message = 'condiciones de iva'
                    await this.$store.dispatch('iva_conditions/getModels')
                }
                if (this.can('employees')) {
                    this.loading_message = 'empleados'
                    await this.$store.dispatch('employees/getEmployees')
                }
                if (this.can('articles.index')) {
                    this.loading_message = 'listas de precios'
                    await this.$store.dispatch('prices_lists/getPircesLists')
                } 
                if (this.can('tags')) {
                    this.loading_message = 'etiquetas'
                    await this.$store.dispatch('tags/getTags')
                } 
                if (this.can('articles.with_dolar')) {
                    this.loading_message = 'monedas'
                    await this.$store.dispatch('coins/getCoins')
                }
                if (this.can('colors')) {
                    this.loading_message = 'colores'
                    await this.$store.dispatch('colors/getColors')
                }
                if (this.can('sizes')) {
                    this.loading_message = 'talles'
                    await this.$store.dispatch('sizes/getSizes')
                }
                if (this.can('brands')) {
                    this.loading_message = 'marcas'
                    await this.$store.dispatch('brands/getBrands')
                }
                if (this.has_online) {
                    this.loading_message = 'titulos'
                    await this.$store.dispatch('titles/getTitles')
                    this.loading_message = 'condiciones'
                    await this.$store.dispatch('conditions/getConditions')
                    this.loading_message = 'dias de trabajo'
                    await this.$store.dispatch('workdays/getWorkdays')
                    this.loading_message = 'horarios de trabajo'
                    await this.$store.dispatch('schedules/getSchedules')
                    this.getOrdersAndQuestions()
                    this.getBuyers()
                    this.getActiveCupons()
                    this.getCalls()
                    this.listenChannels()
                }
                if (this.is_provider) {
                    if (this.can('discounts_sellers')) {
                        this.loading_message = 'descuentos'
                        await this.$store.dispatch('discounts/getDiscounts')
                        this.loading_message = 'vendedores'
                        await this.$store.dispatch('sellers/getSellers')
                        this.loading_message = 'comisiones'
                        await this.$store.dispatch('commissioners/getCommissioners')
                        this.loading_message = 'tipos de venta'
                        await this.$store.dispatch('sale_types/getSaleTypes')
                        this.$store.commit('vender/setSaleType', 1)
                    } 
                    this.$store.commit('auth/setLoading', false)
                    this.loading_message = 'informacion'
                } else {
                    this.$store.commit('auth/setLoading', false)
                    this.loading_message = 'informacion'
                }
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
    background: #FFF
    font-family: Roboto, Nunito, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    height: 100vh
.fade-enter-active,
.fade-leave-active 
    transition-duration: 0.3s
    transition-property: opacity
    transition-timing-function: ease


.fade-enter,
.fade-leave-active 
    opacity: 0
</style>
