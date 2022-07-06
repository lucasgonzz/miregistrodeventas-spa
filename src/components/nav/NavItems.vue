<template>
<div
class="nav-items">
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
</div>
</template>
<script>
import mixin from '@/mixins/nav'
export default {
    name: 'NavItems',
    mixins: [mixin],
    components: {
    },
}
</script>
<style lang="sass">
.nav-items
	@media screen and (min-width: 768px)
		display: flex
</style>