<template>
<div>
	<create-client></create-client>
	<b-modal id="clients" :title="title" body-class="al-borde-md" hide-footer :hide-header="view == 1">
		<clients
		v-if="view == 0"></clients>
		<discounts-sale-type
		v-if="view == 1"></discounts-sale-type>
	</b-modal>
</div>
</template>
<script>
import CreateClient from '@/components/vender/modals/clients/Create.vue'
import Clients from '@/components/vender/modals/clients/Clients'
import DiscountsSaleType from '@/components/vender/modals/clients/DiscountsSaleType'
export default {
	name: 'ClientsIndex',
	components: {
		CreateClient,
		Clients,
		DiscountsSaleType,
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