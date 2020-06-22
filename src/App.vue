<template>
    <div id="app">
		<!-- <router-link :to="{name: 'Login'}">
			Login
		</router-link> -->
        <div v-if="authenticated">
            <nav-component></nav-component>
        </div>
        <router-view/>
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
        if (this.authenticated) {
            console.log('si')
        } else {
            this.$router.replace({name: 'Login'})
            console.log('no')
        }
    }
}
</script>
<style lang="scss">
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}

#nav {
padding: 30px;

a {
font-weight: bold;
color: #2c3e50;

&.router-link-exact-active {
color: #42b983;
}
}
}
</style>
