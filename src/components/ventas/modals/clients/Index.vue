<template>
<div>
    <confirm
    :text="text_delete"
    :actions="['clients/delete']"
    id="delete-client"
    toast="Cliente eliminado"></confirm>
	<create></create>	
	<edit></edit>	
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
import Create from '@/components/vender/modals/clients/Create.vue'
import Edit from '@/components/ventas/modals/clients/Edit.vue'
import Import from '@/components/ventas/modals/clients/Import.vue'
import Buscador from '@/components/ventas/modals/clients/Buscador'
import ClientsNav from '@/components/ventas/modals/clients/Nav'
import List from '@/components/ventas/modals/clients/List'
export default {
	name: 'Clients',
	components: {
		Confirm,
		Create,	
		Edit,
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