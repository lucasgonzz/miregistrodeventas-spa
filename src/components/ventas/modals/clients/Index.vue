<template>
<div>
    <confirm
    :text="text_delete"
    :actions="['clients/delete']"
    id="delete-client"
    toast="Cliente eliminado"></confirm>
	<model></model>	
	<import></import>	
	<b-modal id="clients" title="Clientes" hide-footer size="lg">
		<buscador></buscador>
		<clients-nav></clients-nav>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm.vue'
import Model from '@/components/ventas/modals/clients/Model.vue'
import Import from '@/components/ventas/modals/clients/Import.vue'
import Buscador from '@/components/ventas/modals/clients/Buscador'
import ClientsNav from '@/components/ventas/modals/clients/Nav'
import List from '@/components/ventas/modals/clients/List'
export default {
	name: 'Clients',
	components: {
		Confirm,
		Model,
		Import,
		Buscador,
		ClientsNav,
		List,
	},
	computed: {
		delete() {
			return this.$store.state.clients.delete
		},
		text_delete() {
			return '¿Seguro que quiere eliminar el cliente '+this.delete.name+'?'
		}
	}
}
</script>