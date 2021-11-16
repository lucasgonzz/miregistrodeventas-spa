<template>
<div>
    <b-navbar 
    v-if="show_nav"
    toggleable="lg" 
    variant="primary">
        <b-navbar-brand>
            Mi registro de ventas
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
                :class="activeLink('Vender')">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="can('Ingresar articulos')"
                :class="activeLink('Ingresar')">
                    Ingresar
                </b-nav-item>
                <b-nav-item 
                @click="toListado"
                v-if="can('Ver articulos')"
                :class="activeLink('Listado')">
                    Listado
                </b-nav-item>
                <b-nav-item
                @click="toVentas"
                v-if="can('Ver ventas')"
                :class="activeLink('Ventas')">
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin()"
                :class="activeLink('Empleados')">
                    Empleados
                </b-nav-item>
                <b-nav-item 
                @click="toOnline"
                v-if="has_online && can('Online')"
                :class="activeLink('Online')">
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
                    :to="{name: 'Configuration'}">
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