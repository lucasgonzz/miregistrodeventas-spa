<template>
<b-modal id="clients" :title="title" body-class="al-borde-md" hide-footer :hide-header="view == 1">
	<clients
	v-if="view == 0"></clients>
	<discounts
	v-if="view == 1"></discounts>
</b-modal>
</template>
<script>
import Clients from '@/components/vender/modals/clients/Clients'
import Discounts from '@/components/vender/modals/clients/Discounts'
export default {
	name: 'ClientsIndex',
	components: {
		Clients,
		Discounts,
	},
	computed: {
		view() {
			return this.$store.state.vender.clients.view
		},
		title() {
			if (this.view == 0) {
				return 'Seleccione un cliente para esta venta'
			}
			if (this.view == 1) {
				return 'Seleccione los descuentos para esta venta'
			}
			if (this.view == 2) {
				return 'Seleccione las comisiones para esta venta'
			}
		}
	},
}
</script>