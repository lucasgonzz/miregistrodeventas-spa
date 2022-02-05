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
            <div v-if="authenticated">
                <nav-component></nav-component>
            </div>  
            <b-container 
            :class="container_class"
            fluid>
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </b-container>
        </div>
    </div>
</template>
<script>
import NavComponent from './components/nav/NavComponent'
import LogoLoading from '@/components/common/LogoLoading'
import web_sockets from '@/mixins/web_sockets'
import online from '@/mixins/online'

export default {
    components: {
        NavComponent,
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
            if (this.current_page != 'Online' && this.current_page != 'Login') {
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
            if (this.authenticated) {
                console.log('watch de authenticated')
                this.callMethods()
            }
        }
    },
    created() {
        console.log('se creo app')
        if (location.href.indexOf("www.") > -1) {
            console.log('tiene www')
            location.replace(process.env.VUE_APP_APP_URL);
        }
        this.$store.dispatch('auth/me')
        .then(() => {
            console.log('termino auth/me')
            this.setView()
            if (this.authenticated) {
                this.callMethods()
            }
        })
    },
    data() {
        return {
            // loading: false,
            loading_message: 'informacion'
        }
    },
    methods: {
        setView() {
            console.log('setView')
            if (!this.authenticated) {
                if (this.$route.name != 'Login') {
                    this.$router.push({name: 'Login'})
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
            if (this.can('Vender')) {
                route = '/vender'
            } else if (this.can('Ingresar articulos')) {
                route = '/ingresar'
            } else if (this.can('Ver articulos')) {
                route = '/listado'
            } else {
                route = '/ventas'
            }
            console.log('redireccionando a: '+route)
            this.$router.replace(route)
        },
        async callMethods() {
            // if (this.isOnline) {
                this.$store.commit('auth/setLoading', true)
                this.$store.dispatch('special_prices/getSpecialPrices')
                this.loading_message = 'proveedores'
                await this.$store.dispatch('providers/getProviders')
                this.loading_message = 'categorias'
                await this.$store.dispatch('categories/getCategories')
                this.loading_message = 'subcategorias'
                await this.$store.dispatch('sub_categories/getSubCategories')
                this.loading_message = 'articulos'
                await this.$store.dispatch('articles/getArticles')
                this.loading_message = 'clientes'
                await this.$store.dispatch('clients/getClients')
                this.loading_message = 'ventas'
                await this.$store.dispatch('sales/days_previus_sales/getDaysPreviusSales')
                await this.$store.dispatch('sales/getSales')
                this.loading_message = 'permisos'
                await this.$store.dispatch('permissions/getPermissions')
                this.loading_message = 'empleados'
                await this.$store.dispatch('employees/getEmployees')
                this.loading_message = 'descuentos'
                await this.$store.dispatch('discounts/getDiscounts')
                this.loading_message = 'listas de precios'
                await this.$store.dispatch('prices_lists/getPircesLists')
                this.loading_message = 'etiquetas'
                await this.$store.dispatch('tags/getTags')
                this.loading_message = 'monedas'
                await this.$store.dispatch('coins/getCoins')
                this.loading_message = 'colores'
                await this.$store.dispatch('colors/getColors')
                this.loading_message = 'iconos'
                await this.$store.dispatch('icons/getIcons')
                this.loading_message = 'titulo'
                await this.$store.dispatch('title/getTitle')
                this.loading_message = 'marcas'
                await this.$store.dispatch('brands/getBrands')
                this.loading_message = 'condiciones'
                await this.$store.dispatch('conditions/getConditions')
                this.loading_message = 'dias de trabajo'
                await this.$store.dispatch('workdays/getWorkdays')
                this.loading_message = 'horarios de trabajo'
                await this.$store.dispatch('schedules/getSchedules')
                if (this.is_provider) {
                    this.loading_message = 'vendedores'
                    await this.$store.dispatch('sellers/getSellers')
                    this.loading_message = 'comisiones'
                    await this.$store.dispatch('commissioners/getCommissioners')
                    this.loading_message = 'tipos de venta'
                    await this.$store.dispatch('sale_types/getSaleTypes')
                    this.$store.commit('vender/setSaleType', 1)
                    this.$store.commit('auth/setLoading', false)
                    this.loading_message = 'informacion'
                } else {
                    this.$store.commit('auth/setLoading', false)
                    this.loading_message = 'informacion'
                }
            // } else {
            //     let articles = this.$offlineStorage.get('articles')
            //     console.log('cargando del cache')
            //     console.log(articles)
            //     this.$store.commit('articles/setArticles', articles)
            // }
            // this.$store.dispatch('markers/getMarkers')
            // this.$store.dispatch('markers/getMarkerGroups')
            // this.$store.dispatch('markers/getMarkerGroupsWithMarkers')
            if (this.has_online) {
                this.getOrdersAndQuestions()
                this.getBuyers()
                this.getActiveCupons()
                this.listenChannels()
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
    font-family: Nunito, Helvetica, Arial, sans-serif
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
