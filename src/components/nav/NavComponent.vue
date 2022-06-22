<template>
<div>
    <div
    v-if="show_nav">
        <b-navbar 
        class="nav-app"
        toggleable="md" 
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
                    <b-nav-item 
                    v-if="hasExtencion('budgets') || hasExtencion('order_productions')"
                    @click="toProduccion"
                    :class="activeLink('Produccion')">
                        Produccion
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
                    :to="{name: 'Proveedores', params: {view: 'lista'}}"
                    v-if="hasExtencion('providers')"
                    :class="activeLink('Proveedores')">
                        Proveedores
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
                        v-show="unconfirmed_orders_questions_calls_length > 0">
                            {{ unconfirmed_orders_questions_calls_length }}
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
                    v-if="user.addresses.length >= 2 && selected_address"
                    v-b-modal="'select-address'">
                        <div class="p-15">
                            <p
                            class="m-b-0">
                                Direccion selecionada:
                            </p>
                            <p
                            class="m-b-0">
                                <i class="icon-right"></i>
                                {{ selected_address.street }} {{ selected_address.street_number }}
                            </p>
                        </div>
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
    <nav-home></nav-home>
</div>
</template>
<script>
import OrderInfo from '@/components/nav/components/OrderInfo'
import MobileSideBar from '@/components/nav/MobileSideBar'
import NavHome from '@/components/home/components/Nav'

// Mixins
import mixin from '@/mixins/nav'
export default {
    name: 'NavComponent',
    mixins: [mixin],
    components: {
        OrderInfo,
        MobileSideBar,
        NavHome,
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