<template>
<b-modal id="clients" title="Clientes" hide-footer size="lg">
	<update-list></update-list>
	<buscador></buscador>
	<clients-nav></clients-nav>
	<clients-list></clients-list>
</b-modal>
</template>
<script>
import UpdateList from '@/components/ventas/modals/clients/UpdateList'
import Buscador from '@/components/ventas/modals/clients/Buscador'
import ClientsNav from '@/components/ventas/modals/clients/Nav'
import ClientsList from '@/components/ventas/modals/clients/ClientsList'
export default {
	name: 'Clients',
	components: {	
		UpdateList,
		Buscador,
		ClientsNav,
		ClientsList,
	}
}
</script>