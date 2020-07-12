<template>
    <div id="app">
        <configuracion></configuracion>
        <div v-if="authenticated">
            <nav-component></nav-component>
        </div>  
        <b-container fluid class="m-t-20">
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
        </b-container>
    </div>
</template>
<script>
import NavComponent from './components/NavComponent'
import Configuracion from './components/Configuracion'

export default {
    components: {
        NavComponent,
        Configuracion
    },
    computed: {
        authenticated() {
            return this.$store.state.auth.authenticated
        }
    },
    created() {
        if (this.authenticated) {
            if (this.$router.path == '/login') {
                this.$router.replace({name: 'Ingresar'})
            }
        } else {
            if (this.$route.path != '/login') {
                this.$router.replace({name: 'Login'})
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
