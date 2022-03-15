<template>
<div
v-if="show_nav">
    <b-navbar 
    class="nav-app"
    toggleable="lg" 
    variant="primary">
        <b-navbar-brand>
            <img src="@/assets/logo blanco.png" alt="">
        </b-navbar-brand>

        <b-navbar-toggle target="mobile-nav">
            <template v-slot:default>
                <span class="icon-bars"></span>
            </template>
        </b-navbar-toggle>
        <b-collapse 
        :class="!show_nav_content ? 'j-end' : ''"
        id="nav-collapse" is-nav>
            <b-navbar-nav
            v-if="show_nav_content">
                <b-nav-item :to="{name: 'Vender'}"
                v-if="can('sales.store')"
                :class="activeLink('Vender')">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="can('articles.store')"
                :class="activeLink('Ingresar')">
                    Ingresar
                </b-nav-item>
                <b-nav-item 
                @click="toListado"
                v-if="can('articles.index')"
                :class="activeLink('Listado')">
                    Listado
                </b-nav-item>
                <b-nav-item
                @click="toVentas"
                v-if="can('sales.index')"
                :class="activeLink('Ventas')">
                    Ventas
                </b-nav-item>
                <b-nav-item 
                :to="{name: 'Empleados'}"
                v-if="can('employees')"
                :class="activeLink('Empleados')">
                    Empleados
                </b-nav-item>
                <b-nav-item 
                @click="toOnline"
                v-if="has_online"
                :class="activeLink('Online')">
                    Online
                    <b-badge
                    variant="danger"
                    v-show="unconfirmed_orders_questions_length > 0">
                        {{ unconfirmed_orders_questions_length }}
                    </b-badge>
                </b-nav-item>
            </b-navbar-nav>
            <b-nav-item-dropdown right>
                <template v-slot:button-content>
                    {{ user.name }}
                </template>
                <b-dropdown-item
                :to="{name: 'Configuration', params: {view: 'cuenta'}}">
                    <i class="icon-config"></i>
                    Configuracion
                </b-dropdown-item>
                <b-dropdown-item 
                @click="logout">
                    <i class="icon-sign-out"></i>
                    Salir
                </b-dropdown-item>
            </b-nav-item-dropdown>
        </b-collapse>
    </b-navbar>
    <p v-if="isOffline">Se perdio la conexion</p>
    <order-info></order-info>
    <mobile-side-bar></mobile-side-bar>
</div>
</template>
<script>
import OrderInfo from '@/components/nav/components/OrderInfo'
import MobileSideBar from '@/components/nav/MobileSideBar'

// Mixins
import mixin from '@/mixins/nav'
export default {
    name: 'NavComponent',
    mixins: [mixin],
    components: {
        OrderInfo,
        MobileSideBar,
    },
	methods: {
        startIntrojs() {
            this.$intro()
            .setOption("showProgress", true)
            .setOption('doneLabel', 'Listo')
            .setOption('nextLabel', 'Siguiente')
            .setOption('prevLabel', 'Atras')
            .setOption('skipLabel', 'Listo').start()
            // introJs().setOption('showProgress', true).setOption('hidePrev', true).setOption('hideNext', true).start()
        },
	}
}
</script>