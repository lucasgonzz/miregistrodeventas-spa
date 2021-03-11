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
            <configuracion></configuracion>
            <div v-if="authenticated">
                <nav-component></nav-component>
            </div>  
            <b-container fluid>
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </b-container>
        </div>
    </div>
</template>
<script>
import NavComponent from './components/NavComponent'
import Configuracion from './components/Configuracion'
import LogoLoading from '@/components/common/LogoLoading'

export default {
    components: {
        NavComponent,
        Configuracion,
        LogoLoading,
    },
    computed: {
        authenticated() {
            return this.$store.state.auth.authenticated
        },
        user() {
            return this.$store.state.auth.user
        },
        route() {
            return this.$route.path
        },
        loading() {
            return this.$store.state.auth.loading
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
            if (this.can('sale.create')) {
                route = '/vender'
            } else if (this.can('article.create')) {
                route = '/ingresar'
            } else if (this.can('article.index')) {
                route = '/listado'
            } else {
                route = '/ventas'
            }
            console.log('redireccionando a: '+route)
            this.$router.replace(route)
        },
        async callMethods() {
            // this.loading = true
            if (this.isOnline) {
                this.$store.commit('auth/setLoading', true)
                this.$store.dispatch('special_prices/getSpecialPrices')
                this.loading_message = 'proveedores'
                await this.$store.dispatch('providers/getProviders')
                this.loading_message = 'categorias'
                await this.$store.dispatch('categories/getCategories')
                this.loading_message = 'articulos'
                await this.$store.dispatch('articles/getArticles')
                this.loading_message = 'clientes'
                await this.$store.dispatch('clients/getClients')
                this.loading_message = 'ventas'
                await this.$store.dispatch('sales/days_previus_sales/getDaysPreviusSales')
                await this.$store.dispatch('sales/getSales')
                if (this.isProvider()) {
                    this.loading_message = 'descuentos'
                    this.$store.dispatch('discounts/getDiscounts')
                    .then(() => {
                        this.loading_message = 'vendedores'
                        this.$store.dispatch('sellers/getSellers')
                        .then(() => {
                            this.loading_message = 'comisionados'
                            this.$store.dispatch('commissioners/getCommissioners')
                            .then(() => {
                                this.$store.dispatch('sale_types/getSaleTypes')
                                .then(() => {
                                    this.$store.commit('vender/setSaleType', 1)
                                })
                                this.$store.commit('auth/setLoading', false)
                                this.loading_message = 'informacion'
                                // this.loading = false
                            })
                        })
                    })
                } else {
                    this.$store.commit('auth/setLoading', false)
                    this.loading_message = 'informacion'
                    // this.loading = false
                }
            } else {
                let articles = this.$offlineStorage.get('articles')
                console.log('cargando del cache')
                console.log(articles)
                this.$store.commit('articles/setArticles', articles)
            }
            // this.$store.dispatch('markers/getMarkers')
            // this.$store.dispatch('markers/getMarkerGroups')
            // this.$store.dispatch('markers/getMarkerGroupsWithMarkers')
            if (this.hasOnline(this.user)) {
                this.$store.dispatch('online/getUnconfirmedOrders')
                this.$store.dispatch('online/getQuestions')
                this.Echo.channel('orderChannel')
                .listen('UnconfirmedOrderEvent', (res) => {
                    this.$store.commit('online/addUnconfirmedOrder', res.order)
                    this.$toast.success(`${res.order.buyer.name} quiere hacer un pedido`)
                }); 
                this.Echo.channel('questionChannel')
                .listen('QuestionCreatedEvent', (e) => {
                    let question = e.question
                    this.$store.commit('online/addQuestion', question)
                    this.$toast.success(`${question.buyer.name} te ha hecho una pregunta`)
                }); 
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
.container-fluid
    padding-bottom: 1em
.fade-enter-active,
.fade-leave-active 
    transition-duration: 0.3s
    transition-property: opacity
    transition-timing-function: ease


.fade-enter,
.fade-leave-active 
    opacity: 0
</style>
