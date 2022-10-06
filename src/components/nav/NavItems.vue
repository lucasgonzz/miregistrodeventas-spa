<template>
<div
class="nav-items">
    <b-nav-item :to="{name: 'Vender', params: {view: 'remito'}}"
    v-if="can('sale.store')"
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
    v-if="can('article.store')"
    :class="activeLink('Ingresar')">
        Ingresar
    </b-nav-item>
    <b-nav-item 
    @click="toListado"
    v-if="can('article.index')"
    :class="activeLink('Listado')">
        Listado
    </b-nav-item>
    <b-nav-item 
    v-if="hasExtencion('providers')"
    :to="{name: 'Proveedores', params: {view: 'proveedores', sub_view: 'lista'}}"
    :class="activeLink('Proveedores')">
        Proveedores
    </b-nav-item>
    <b-nav-item
    @click="toVentas"
    v-if="can('sale.index')"
    :class="activeLink('Ventas')">
        Ventas
    </b-nav-item>
    <b-nav-item
    @click="toClientes"
    v-if="can('client.index')"
    :class="activeLink('Clientes')">
        Clientes
    </b-nav-item>
    <b-nav-item 
    @click="toEmpleados"
    v-if="can('employee')"
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