<template>
<div>
    <b-navbar 
    class="nav-home"
    v-if="current_page == 'Home'"
    toggleable="lg">
        <b-navbar-brand>
            <img src="@/assets/logo.png" alt="">
        </b-navbar-brand>

        <b-navbar-toggle target="mobile-home-nav">
            <template v-slot:default>
                <span class="icon-bars"></span>
            </template>
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <div>
                <div
                v-scroll-to="'#features'"
                class="m-r-15 btn-left">
                    Funcionalidades
                </div>
                <div
                v-scroll-to="'#payment-plans'"
                class="m-r-15 btn-left">
                    Precios
                </div>
            </div>
            <div>
                <b-button
                :to="{name: 'Login'}"
                class="m-r-15 btn-auth"
                variant="outline-primary">
                    Iniciar sesión
                </b-button>
                <b-button
                v-scroll-to="'#register'"
                class="btn-auth"
                variant="primary">
                    Registrate
                </b-button>
            </div>
        </b-collapse>
    </b-navbar>
    <side-bar></side-bar>
</div>
</template>
<script>
import SideBar from '@/components/home/components/SideBar'
export default {
    name: 'NavHome',
    components: {
        SideBar,
    }
}
</script>
<style lang="sass">
.nav-home  
    height: 100px
    @media screen and (max-width: 576px)
        padding: 0 2em !important
    @media screen and (min-width: 576px)
        padding: 0 4em !important
    .btn-left 
        display: inline-block
        padding: 0 1em
        cursor: pointer
        background: none
        color: rgba(0, 0, 0, .8)
        border: none !important
        font-size: 1.1em
    .btn-auth
        padding: .7em 1.7em
        font-weight: bold
    .navbar-collapse
        justify-content: space-between
    .navbar-brand
        img 
            @media screen and (max-width: 576px)
                width: 90px
            @media screen and (min-width: 576px)
                width: 150px
                margin-right: 1em
</style>