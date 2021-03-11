<template>
<div>
    <update-password></update-password>
    <update-user :user="user"></update-user>
    <b-navbar toggleable="lg" variant="primary">
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
                v-if="can('sale.create')"
                :class="activeLink('vender')">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="can('article.create')"
                :class="activeLink('ingresar')">
                    Ingresar
                </b-nav-item>
                <b-nav-item 
                @click="toListado"
                v-if="can('article.index')"
                :class="activeLink('listado')">
                    Listado
                </b-nav-item>
                <b-nav-item
                @click="toVentas"
                v-if="can('sale.index')"
                :class="activeLink('ventas')">
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin(user)"
                :class="activeLink('empleados')">
                    Empleados
                </b-nav-item>
                <b-nav-item :to="{name: 'Online'}"
                v-if="hasOnline(user)"
                :class="activeLink('online')">
                    Online
                    <b-badge
                    variant="primary"
                    v-show="unconfirmedOrders_questions_length > 0">
                        {{ unconfirmedOrders_questions_length }}
                    </b-badge>
                </b-nav-item>
                <b-nav-item
                @click="logout">
                    <i class="icon-sign-out"></i>
                    Salir
                </b-nav-item>
            </b-navbar-nav>
            <!-- <b-navbar-nav class="ml-auto">
                <b-nav-item>
                    <b-dropdown
                    variant="primary" 
                    :text="user.name" 
                    right>
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
                    </b-dropdown>
                </b-nav-item>
            </b-navbar-nav> -->
        </b-collapse>
    </b-navbar>
    <p v-if="isOffline">Se perdio la conexion</p>
    <b-sidebar id="mobile-nav" title="Mi registro de ventas" shadow>
        <nav>
            <b-nav vertical>
                <b-nav-item :to="{name: 'Vender'}"
                v-if="can('sale.create')"
                :class="currentPage == '/vender' ? 'active-link-mobile' : ''">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="can('article.create')"
                :class="currentPage == '/ingresar' ? 'active-link-mobile' : ''">
                    Ingresar
                </b-nav-item>
                <b-nav-item :to="{name: 'Listado'}"
                v-if="can('article.index')"
                :class="currentPage == '/listado' ? 'active-link-mobile' : ''">
                    Listado
                </b-nav-item>
                <b-nav-item :to="{name: 'Ventas'}"
                v-if="can('sale.index')"
                :class="currentPage == '/ventas' ? 'active-link-mobile' : ''">
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin(user)"
                :class="currentPage == '/empleados' ? 'active-link-mobile' : ''">
                    Empleados
                </b-nav-item>
                <b-nav-item :to="{name: 'Online'}"
                v-if="hasOnline(user)"
                :class="currentPage == '/tienda-online' ? 'active-link-mobile' : ''">
                    Online
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

// Mixins
import mixin from '@/mixins/nav'
export default {
    name: 'NavComponent',
    mixins: [mixin],
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
        },
        unconfirmedOrders_questions_length() {
            if (this.hasOnline(this.user)) {
                let unconfirmed_orders = this.$store.state.online.unconfirmed_orders
                let questions = this.$store.state.online.questions
                return unconfirmed_orders.length + questions.length
            }
            return null
        },
	},
	methods: {
        activeLink(url) {
            return this.currentPage == '/'+url ? 'active-link' : ''
        },
        startIntrojs() {
            this.$intro()
            .setOption("showProgress", true)
            .setOption('doneLabel', 'Listo')
            .setOption('nextLabel', 'Siguiente')
            .setOption('prevLabel', 'Atras')
            .setOption('skipLabel', 'Listo').start()
            // introJs().setOption('showProgress', true).setOption('hidePrev', true).setOption('hideNext', true).start()
        },
        logout() {
            this.$store.dispatch('auth/logout')
            .then(() => {
                this.$router.replace({name: 'Login'})
            })
		},
		isTrial() {
            console.log('aca:')
            console.log(this.$state.user)
			if (this.$state.user.status == 'trial') {
				return true
			} 
			return false
		},
	}
}
</script>
<style lang="sass">
#mobile-nav
    .nav-item-config
        a
            font-size: 1.1em
            font-weight: bold
    .nav-link 
        text-align: left
        color: lighten(#4a2c82, 30)
        font-size: 1.3em
        font-weight: bold
    .active-link-mobile
        a
            color: #4a2c82

.navbar
    // position: relative
    padding: 1em 0 0 0
    margin-bottom: 1em
    .navbar-brand 
        color: #FFF !important
        margin: 0 .5em
        padding: 0
    .icon-bars
        color: #fff
        background: none
        font-size: 1.2em
    .navbar-toggler
        border: none
        &:focus
            outline: 0 !important

    .nav-link
        padding: 0
        font-size: 1.2em
        color: rgba(255,255,255,.7) !important
        &:hover
            color: #FFF !important
        &:active 
            transform: scale(.9)
    .active-link 
        a
            font-weight: bold
            color: #FFF !important

</style>