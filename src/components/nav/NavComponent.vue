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
            id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <nav-items></nav-items>
                </b-navbar-nav>
                <b-nav-item-dropdown 
                right>
                    <template v-slot:button-content>
                        {{ user.name }}
                    </template>
                    <b-dropdown-item
                    :to="{name: 'Configuration', params: {view: 'cuenta'}}">
                        <i class="icon-config"></i>
                        Configuracion
                    </b-dropdown-item>
                    <b-dropdown-item
                    v-if="!is_super && user.addresses.length >= 2 && selected_address"
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
                    v-b-modal="'update-features'">
                        <i class="icon-eye"></i>
                        Nueva version
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
import NavItems from '@/components/nav/NavItems'
import OrderInfo from '@/components/nav/components/OrderInfo'
import MobileSideBar from '@/components/nav/MobileSideBar'
import NavHome from '@/components/home/components/Nav'

// Mixins
import mixin from '@/mixins/nav'
export default {
    name: 'NavComponent',
    mixins: [mixin],
    components: {
        NavItems,
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