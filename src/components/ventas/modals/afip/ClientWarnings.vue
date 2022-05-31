<template>
<div
v-if="!loading && has_warnings">
	<b-list-group
	class="m-t-15 s">
		<b-list-group-item
		class="text-danger text-center">
			<strong>
				Corriga los siguientes errores para poder emitir la factura
			</strong>
		</b-list-group-item>
		<b-list-group-item
		v-if="!sale.client.cuit">
			<i class="icon-right"></i>
			El cliente no tiene un <strong>CUIT</strong> asignado 
		</b-list-group-item>
		<b-list-group-item
		v-if="!sale.client.iva_condition_id">
			<i class="icon-right"></i>
			El cliente no tiene una <strong>condicion frente al iva</strong> asignada 
		</b-list-group-item>
	</b-list-group>
	<b-button
	class="m-t-15"
	@click="editClient(sale.client)"
	block
	variant="outline-primary">
		Editar cliente
	</b-button>
</div>
</template>
<script>
import clients from '@/mixins/clients'
import afip from '@/mixins/afip'
export default {
	mixins: [clients, afip],
}
</script>