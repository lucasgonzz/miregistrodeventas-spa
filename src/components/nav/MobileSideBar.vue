<template>
	<b-sidebar id="mobile-nav" title="Mi registro de ventas" shadow>
        <nav>
            <b-nav vertical>
                <b-nav-item :to="{name: 'Vender'}"
                v-if="can('sale.create')"
                :class="activeLink('Vender')">
                    Vender
                </b-nav-item>
                <b-nav-item :to="{name: 'Ingresar'}"
                v-if="can('article.create')"
                :class="activeLink('Ingresar')">
                    Ingresar
                </b-nav-item>
                <b-nav-item :to="{name: 'Listado'}"
                v-if="can('article.index')"
                :class="activeLink('Listado')">
                    Listado
                </b-nav-item>
                <b-nav-item :to="{name: 'Ventas'}"
                v-if="can('sale.index')"
                :class="activeLink('Ventas')">
                    Ventas
                </b-nav-item>
                <b-nav-item :to="{name: 'Empleados'}"
                v-if="isAdmin(user)"
                :class="activeLink('Empleados')">
                    Empleados
                </b-nav-item>
                <b-nav-item 
                @click="toOnline"
                v-if="has_online && can('Online')"
                :class="activeLink('Online')">
                    Online
                </b-nav-item>

                <b-nav-item 
                :to="{name: 'Configuration'}"
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
</template>
<script>
import nav from '@/mixins/nav'
export default {
    mixins: [nav],
}
</script>