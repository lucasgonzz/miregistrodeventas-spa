<template>
<b-modal id="clients" title="Clientes" hide-footer size="lg">
	<buscador></buscador>
	<clients-nav></clients-nav>
	<clients-list></clients-list>
</b-modal>
</template>
<script>
import Buscador from '@/components/ventas/modals/clients/Buscador'
import ClientsNav from '@/components/ventas/modals/clients/Nav'
import ClientsList from '@/components/ventas/modals/clients/ClientsList'
export default {
	name: 'Clients',
	components: {	
		Buscador,
		ClientsNav,
		ClientsList,
	}
}
</script>