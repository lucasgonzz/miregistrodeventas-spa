<template>
<div>
    <update-password></update-password>
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
                    <i class="icon-sm icon-tag"></i>
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="hasPermissionTo('article.create', user)"
                :class="currentPage == '/ingresar' ? 'active-link' : ''">
                    <i class="icon-sm icon-plus"></i>
                    Ingresar
                </b-nav-item>
                <b-nav-item :to="{name: 'Listado'}"
                v-if="hasPermissionTo('article.index', user)"
                :class="currentPage == '/listado' ? 'active-link' : ''">
                    <i class="icon-sm icon-list-ol"></i>
                    Listado
                </b-nav-item>
                <b-nav-item :to="{name: 'Ventas'}"
                v-if="hasPermissionTo('sale.index', user)"
                :class="currentPage == '/ventas' ? 'active-link' : ''">
                    <i class="icon-sm icon-clipboard-3"></i>
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin(user)"
                :class="currentPage == '/empleados' ? 'active-link' : ''">
                    <i class="icon-sm icon-users"></i>
                    Empleados
                </b-nav-item>
                <div>
                    <b-nav-item-dropdown :text="user.name" right>
                        <b-dropdown-item 
                        v-if="isAdmin(user)"
                        v-b-modal="'configuracion'">
                            <i class="icon-config"></i>                   
                            Configuracion
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
                :class="currentPage == '/vender' ? 'active-link-mobile' : ''">
                    <i class="icon-sm icon-tag"></i>
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                :class="currentPage == '/ingresar' ? 'active-link-mobile' : ''">
                    <i class="icon-sm icon-plus"></i>
                    Ingresar
                </b-nav-item>
                <b-nav-item :to="{name: 'Listado'}"
                :class="currentPage == '/listado' ? 'active-link-mobile' : ''">
                    <i class="icon-sm icon-list-ol"></i>
                    Listado
                </b-nav-item>
                <b-nav-item :to="{name: 'Ventas'}"
                :class="currentPage == '/ventas' ? 'active-link-mobile' : ''">
                    <i class="icon-sm icon-clipboard-3"></i>
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                :class="currentPage == '/empleados' ? 'active-link-mobile' : ''">
                    <i class="icon-sm icon-users"></i>
                    Empleados
                </b-nav-item>

                <b-nav-item 
                class="nav-item-config"
                @click="logout">
                    Nombre del comercio
                </b-nav-item>
                <b-nav-item 
                class="nav-item-config"
                v-b-modal="'update-password'">
                    Cambiar contraseña
                </b-nav-item>
                <b-nav-item 
                class="nav-item-config"
                @click="logout">
                    Compartir app
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
export default {
    components: {
        UpdatePassword
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
    @media (min-width: 768px) 
        [class^='icon-sm']
            display: none
    button
        background: none
        border: none
    .icon-bars
        color: #333
        border: none
        background: none
        font-size: 1.4em
    .nav-link
        font-size: 1.2rem
        color: rgba(#007bff, .7) !important
        &:hover
            color: #007bff !important

    .nav-items
        display: flex
        width: 100%
    @media (min-width: 768px)
        padding-bottom: 0px
        .nav-items
            flex-direction: row

        .active-link 
            font-weight: bold
            // color: #007bff !important
            border-radius: 0px 0px 3px 3px
            border-bottom: 4px solid #007bff
    @media (max-width: 768px)
        height: 50px
        align-items: center
        .nav-items
            flex-direction: column
            position: fixed
            background: rgba(0, 0, 0, .5)
            width: 100%
            height: calc(100vh - 50px)
            top: 50px
            left: -110%
            z-index: 1000
            .cont 
                width: 80%
                background: #FFF
                height: calc(100vh - 50px)
            .nav-item
                padding-left: 1rem
            .nav-link-active
                font-weight: bold
                color: #007bff !important
        .nav-items-show
            left: 0% 
            transition: all .5s 
</style>