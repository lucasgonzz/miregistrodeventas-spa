<template>
    <div id="app">
        <div
        v-if="loading">
            <logo-loading></logo-loading>
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
        loading() {
            return this.$store.state.auth.loading
        },
        authenticated() {
            return this.$store.state.auth.authenticated
        },
        user() {
            return this.$store.state.auth.user
        },
        path() {
            return this.$route.path
        },
    },
    watch: {
        path() {
            this.setView()
        }
    },
    created() {
        this.$store.commit('auth/setLoading', true)
        this.csrf()
        .then(() => {
            this.$store.dispatch('auth/me')
            .then(() => {
                this.$store.commit('auth/setLoading', false)
                this.setView()
                this.callMethods()
            })
            .catch(err => {
                console.log(err)
            })
        })
    },
    methods: {
        csrf() {
            return this.$axios.get('/sanctum/csrf-cookie')
        },
        setView() {
            let route = this.$route.path
            if (this.authenticated) {
                if (route == '/' || 
                    route == '/login' || 
                    ! this.hasPermissionForRoute(route, this.user)) {
                    this.redirect()
                } 
            } else {
                if (route != '/login') {
                    this.$router.replace({name: 'Login'})
                }
            }
        },
        redirect() {
            let route = ''
            if (this.user.admin_id) {
                if (this.hasPermissionTo('sale.create', this.user)) {
                    route = '/vender'
                } else if (this.hasPermissionTo('article.create', this.user)) {
                    route = '/ingresar'
                } else if (this.hasPermissionTo('article.index', this.user)) {
                    route = '/listado'
                } else {
                    route = '/ventas'
                }
            } else {
                if (this.user.status == 'super') {
                    route = '/super'
                } else {
                    route = '/admin'
                }
            }
            this.$router.replace(route)
        },
        callMethods() {
            if (this.authenticated) {
                if (this.user.admin_id) {
                    this.$store.dispatch('getSpecialPrices')
                    this.$store.dispatch('articles/getArticles')
                    this.$store.dispatch('markers/getMarkers')
                    this.$store.dispatch('markers/getMarkerGroups')
                    this.$store.dispatch('markers/getMarkerGroupsWithMarkers')
                    this.$store.dispatch('clients/getClients')
                }
                if (this.hasOnline(this.user)) {
                    this.$store.dispatch('online/getUnconfirmedOrders')
                    this.$store.dispatch('online/getQuestions')
                    this.Echo.channel('orderChannel')
                    .listen('UnconfirmedOrderEvent', (e) => {
                        this.$store.commit('online/addUnconfirmedOrder', e.order)
                        this.$toast.success(`${e.order.buyer.name} quiere hacer un pedido`)
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
}
</script>
<style lang="sass">
@import "./sass/fonts/styles.css"
@import "@/sass/app.sass"
#app 
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
.fade-enter-active,
.fade-leave-active 
  transition-duration: 0.3s
  transition-property: opacity
  transition-timing-function: ease


.fade-enter,
.fade-leave-active 
  opacity: 0
</style>
