<template>
	<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="">
                <strong>
                    Mi registro de ventas
                </strong>
            </a>
            <button type="button" class="nav-toggler d-md-none" id="btn-menu">
                <i class="icon-bars"></i>
            </button>

            <div class="nav-items">
                <div class="cont">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                        <li :class="currentPage == '/vender' ? 'active-link' : ''" class="nav-item">
                            <router-link :to="{name: 'Ingresar'}" class="nav-link">
                                <i class="icon-sm icon-tag"></i>
                                Vender
                            </router-link>
                        </li>
                        <li :class="currentPage == '/ingresar' ? 'active-link' : ''" class="nav-item">
                            <router-link :to="{name: 'Ingresar'}" class="nav-link">
                                <i class="icon-sm icon-plus"></i>
                                Ingresar
                            </router-link>
                        </li>
                        <li :class="currentPage == '/listado' ? 'active-link' : ''" class="nav-item">
                            <router-link :to="{name: 'Listado'}" class="nav-link">
                                <i class="icon-sm icon-list-ol"></i>
                                Listado
                            </router-link>
                        </li>
                        <li :class="currentPage == '/ventas' ? 'active-link' : ''" class="nav-item">
                            <router-link :to="{name: 'Ingresar'}" class="nav-link">
                                <i class="icon-sm icon-clipboard-3"></i>
                                Ventas
                            </router-link>
                        </li>
                        <li :class="currentPage == '/empleados' ? 'active-link' : ''" class="nav-item">
                            <router-link :to="{name: 'Ingresar'}" class="nav-link">
                                <i class="icon-sm icon-users"></i>
                                Empleados
                            </router-link>
                        </li>
                        <!-- <li :class="currentPage == '/ingresar' ? 'active-link' : ''" class="nav-item" v-if="isAdmin() || hasPermissionTo('online')">
                            <router-link :to="{name: 'online'}" class="'nav-link ' + active-link('online')">
                                <i class="icon-sm icon-network"></i>
                                Online
                            </router-link>
                        </li> -->

                        <li class="nav-item d-md-none">
                            <router-link :to="{name: 'Ingresar'}" class="nav-link">
                                <i class="icon-config"></i>                   
                                Configuracion
                            </router-link>
                        </li>
                        <li class="nav-item d-md-none">
                            <button @click="logout" class="nav-link btn" type="submit">
                                <i class="icon-sign-out"></i>
                                Salir
                            </button>
                        </li>
                        <!-- <li class="nav-item d-md-none">
                            <button class="nav-link">
                                La prueba finaliza el dia
                                La prueba finaliza el {{ date_format(date_create(Auth()->user()->expire), 'd/m/Y') }}
                            </button>
                        </li> -->
                    </ul>
                </div>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto d-none d-md-block">
                    <li class="nav-item dropdown">
                        <button id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           {{ user.name }}
                        </button>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <router-link :to="{name: 'configuracion'}" class="dropdown-item">         
                                <i class="icon-config"></i>                   
                                Configuracion
                            </router-link>
                            <li class="nav-item d-md-none">
                                <button @click="logout" class="dropdown-item">
                                    <i class="icon-sign-out"></i>
                                    Salir
                                </button>
                            </li>
                            <button class="dropdown-item">
                                La prueba finaliza el dia
                                <!-- La prueba finaliza el {{ date_format(date_create(Auth()->user()->expire), 'd/m/Y') }} -->
                            </button>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>
<script>
export default {
	computed: {
		user() {
			return this.$store.state.auth.user
		},
        currentPage() {
            return this.$route.path
        }
	},
	methods: {
		async logout() {
			await this.$api.post('/logout')
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
.active-link 
    font-weight: bold
    color: rgb(0, 123, 255) !important
    border-radius: 0px 0px 3px 3px
    border-bottom: 4px solid rgb(0, 123, 255)

.navbar
    position: relative
    @media (min-width: 768px) 
        [class^='icon-sm']
            display: none
    button
        background: none
        border: none
    #btn-menu 
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

        .nav-link-active 
            font-weight: bold
            color: #007bff !important
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