<template>
    <div id="app">
        <div v-if="authenticated">
            <nav-component></nav-component>
        </div>  
        <b-container fluid>
            <router-view/>
        </b-container>
    </div>
</template>
<script>
import NavComponent from './components/NavComponent'

export default {
    components: {
        NavComponent,
    },
    computed: {
        authenticated() {
            return this.$store.state.auth.authenticated
        }
    },
    created() {
        this.$store.dispatch('auth/me')
        .then(() => {
            if (this.authenticated) {
                console.log('Logeado')
                if (this.$router.path == '/login') {
                    console.log('Estaba en login')
                    this.$router.replace({name: 'Ingresar'})
                }
            } else {
                console.log('No logeado')
                if (this.$route.path != '/login') {
                    console.log('Esta en '+this.$route.path)
                    this.$router.replace({name: 'Login'})
                }
            }
        })
    }
}
</script>
<style lang="sass">
@import "@/sass/app.sass"
#app 
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

</style>
