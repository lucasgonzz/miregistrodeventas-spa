<template>
<div>
    <update-deliver-amount></update-deliver-amount>
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
                v-if="can('Vender')"
                :class="activeLink('vender')">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="can('Ingresar articulos')"
                :class="activeLink('ingresar')">
                    Ingresar
                </b-nav-item>
                <b-nav-item 
                @click="toListado"
                v-if="can('Ver articulos')"
                :class="activeLink('listado')">
                    Listado
                </b-nav-item>
                <b-nav-item
                @click="toVentas"
                v-if="can('Ver ventas')"
                :class="activeLink('ventas')">
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin()"
                :class="activeLink('empleados')">
                    Empleados
                </b-nav-item>
                <b-nav-item 
                @click="toOnline"
                v-if="hasOnline(user)"
                :class="activeLink('tienda-online')">
                    Online
                    <b-badge
                    variant="danger"
                    v-show="unconfirmed_orders_questions_length > 0">
                        {{ unconfirmed_orders_questions_length }}
                    </b-badge>
                </b-nav-item>
                <!-- <b-nav-item
                @click="logout">
                    <i class="icon-sign-out"></i>
                    Salir
                </b-nav-item> -->
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        {{ user.name }}
                    </template>
                    <b-dropdown-item
                    v-b-modal="'config'">
                        <i class="icon-config"></i>
                        Configuracion
                    </b-dropdown-item>
                    <b-dropdown-item 
                    @click="logout">
                        <i class="icon-sign-out"></i>
                        Salir
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <order-info></order-info>
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
                v-b-modal="'config'"
                v-if="isAdmin(user)">
                    Configuracion
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
import UpdateDeliverAmount from './config/UpdateDeliverAmount'
import UpdatePassword from './config/UpdatePassword'
import UpdateUser from './config/UpdateUser'

import OrderInfo from '@/components/nav/components/OrderInfo'

// Mixins
import mixin from '@/mixins/nav'
export default {
    name: 'NavComponent',
    mixins: [mixin],
    components: {
        OrderInfo,
        UpdatePassword,
        UpdateDeliverAmount,
        UpdateUser
    },
	computed: {
		user() {
			return this.$store.state.auth.user
		},
        currentPage() {
            return this.$route.path
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