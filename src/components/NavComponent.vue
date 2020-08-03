<template>
<div>
    <update-password></update-password>
    <update-user :user="user"></update-user>
    <b-navbar toggleable="lg" class="">
        <b-navbar-brand>
            <strong>
                Mi registro de ventas
            </strong>
        </b-navbar-brand>

        <b-navbar-toggle target="mobile-nav">
            <template v-slot:default>
                <span class="icon-bars"></span>
            </template>
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{name: 'Vender'}"
                v-if="hasPermissionTo('sale.create', user)"
                :class="currentPage == '/vender' ? 'active-link' : ''">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="hasPermissionTo('article.create', user)"
                :class="currentPage == '/ingresar' ? 'active-link' : ''">
                    Ingresar
                </b-nav-item>
                <b-nav-item :to="{name: 'Listado'}"
                v-if="hasPermissionTo('article.index', user)"
                :class="currentPage == '/listado' ? 'active-link' : ''">
                    Listado
                </b-nav-item>
                <b-nav-item :to="{name: 'Ventas'}"
                v-if="hasPermissionTo('sale.index', user)"
                :class="currentPage == '/ventas' ? 'active-link' : ''">
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin(user)"
                :class="currentPage == '/empleados' ? 'active-link' : ''">
                    Empleados
                </b-nav-item>
                <div>
                    <b-nav-item-dropdown :text="user.name" right>
                            <b-dropdown-item 
                        v-if="isAdmin(user)"
                        class="nav-item-config"
                        v-b-modal="'update-user'">
                            Cambiar nombre
                        </b-dropdown-item>
                        <b-dropdown-item 
                        v-if="isAdmin(user)"
                        class="nav-item-config"
                        v-b-modal="'update-password'">
                            Cambiar contraseña
                        </b-dropdown-item>
                        <b-dropdown-item 
                        @click="startIntrojs"
                        class="nav-item-config">
                            Tutorial
                        </b-dropdown-item>
                        <b-dropdown-item 
                        v-if="user.status == 'trial'"
                        class="nav-item-config">
                            La prueba expira el {{ date(user.expire) }}
                        </b-dropdown-item>
                        <b-dropdown-item
                        @click="logout">
                            <i class="icon-sign-out"></i>
                            Salir
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <b-sidebar id="mobile-nav" title="Mi registro de ventas" shadow>
        <nav>
            <b-nav vertical>
                <b-nav-item :to="{name: 'Vender'}"
                v-if="hasPermissionTo('sale.create', user)"
                :class="currentPage == '/vender' ? 'active-link-mobile' : ''">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="hasPermissionTo('article.create', user)"
                :class="currentPage == '/ingresar' ? 'active-link-mobile' : ''">
                    Ingresar
                </b-nav-item>
                <b-nav-item :to="{name: 'Listado'}"
                v-if="hasPermissionTo('article.index', user)"
                :class="currentPage == '/listado' ? 'active-link-mobile' : ''">
                    Listado
                </b-nav-item>
                <b-nav-item :to="{name: 'Ventas'}"
                v-if="hasPermissionTo('sale.index', user)"
                :class="currentPage == '/ventas' ? 'active-link-mobile' : ''">
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin(user)"
                :class="currentPage == '/empleados' ? 'active-link-mobile' : ''">
                    Empleados
                </b-nav-item>

                <b-nav-item 
                class="nav-item-config"
                v-if="isAdmin(user)"
                v-b-modal="'update-user'">
                    Cambiar nombre
                </b-nav-item>
                <b-nav-item 
                class="nav-item-config"
                v-if="isAdmin(user)"
                v-b-modal="'update-password'">
                    Cambiar contraseña
                </b-nav-item>
                <b-nav-item 
                v-if="user.status == 'trial'"
                class="nav-item-config">
                    La prueba expira el {{ date(user.expire) }}
                </b-nav-item>
                <b-nav-item 
                class="nav-item-config"
                @click="logout">
                    <i class="icon-sign-out"></i>
                    Salir
                </b-nav-item>
            </b-nav>
        </nav>
    </b-sidebar>
</div>
</template>
<script>
import UpdatePassword from './config/UpdatePassword'
import UpdateUser from './config/UpdateUser'
export default {
    components: {
        UpdatePassword,
        UpdateUser
    },
	computed: {
		user() {
			return this.$store.state.auth.user
		},
        currentPage() {
            return this.$route.path
        }
	},
	methods: {
        startIntrojs() {
            this.$intro('#vender')
            this.$intro()
            .setOption("showProgress", true)
            .setOption('doneLabel', 'Listo')
            .setOption('nextLabel', 'Siguiente')
            .setOption('prevLabel', 'Atras')
            .setOption('skipLabel', 'Listo').start()
            // introJs().setOption('showProgress', true).setOption('hidePrev', true).setOption('hideNext', true).start()
        },
        logout() {
			this.$axios.post('/logout')
            .then(() => {
                this.$store.commit('auth/setAuthenticated', false)
                this.$store.commit('auth/setUser', {})
                this.$router.replace({name: 'Login'})
            })
            .catch(err => {
                console.log(err)
            })
		},
		isTrial() {
            console.log('aca:')
            console.log(this.$state.user)
			if (this.$state.user.status == 'trial') {
				return true
			} 
			return false
		}
	}
}
</script>
<style lang="sass">
#mobile-nav
    .nav-item-config
        a
            color: #333
            font-size: 1.1em
            font-weight: bold
    .nav-link 
        text-align: left
        color: rgba(0, 123, 255, .6) 
        font-size: 1.3em
    .active-link-mobile
        a
            font-weight: bold
            color: rgba(0, 123, 255, 1) !important

.navbar
    position: relative
    -webkit-box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.75)
    -moz-box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.75)
    box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.75)
    
    @media (min-width: 992px)
        padding-bottom: 0px
        .navbar-brand
            margin-top: -5px

    .icon-bars
        color: #000
        background: none
        font-size: 1.2em
    .navbar-toggler
        border: none
        &:focus
            outline: 0 !important

    .active-link 
        a
            font-weight: bold
            color: #007bff !important
            border-radius: 0px 0px 3px 3px
            border-bottom: 4px solid #007bff
            // text-shadow: 0 2px 0px #007bff 
    .nav-link
        font-size: 1.2rem
        font-weight: bold
        color: rgba(#007bff, .6) !important
        &:hover
            color: #007bff !important

</style>