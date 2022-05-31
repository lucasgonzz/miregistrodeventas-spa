<template>
	<b-col
	class="col-ver"
	v-if="selected_sales.length" 
	cols="12"
	md="6"
	lg="2">
		<b-dropdown
		:text="selected_sales.length+' ventas seleccionadas'" 
		right 
		variant="primary">
			<b-dropdown-item
			@click="deselectAll">
				<i class="icon-cancel"></i>
				Deseleccionar todo
			</b-dropdown-item>
			<b-dropdown-item
			@click="selectAll">
				<i class="icon-check"></i>
				Seleccionar todo
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'print-sales'">
				<i class="icon-print"></i>
				Imprimir
			</b-dropdown-item>
			<b-dropdown-item
			v-if="selected_sales.length == 1 && !selected_sales[0].afip_ticket"
			@click="showAfipDetails()">
				<i class="icon-clipboard"></i>
				Factura						
			</b-dropdown-item>
			<b-dropdown-item
			v-if="selected_sales.length == 1 && selected_sales[0].afip_ticket"
			@click="printAfipTicket(selected_sales[0])">
				<i class="icon-print"></i>
				Factura PDF
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'delete-sales'">
				<i class="icon-trash"></i>
				Eliminar
			</b-dropdown-item>
		</b-dropdown>
	</b-col>
</template>
<script>
import afip from '@/mixins/afip'
export default {
	mixins: [afip],
	computed: {
		selected_sales() {
			return this.$store.state.sales.selected_sales
		},
	},
	methods: {
		showAfipDetails() {
			this.$store.dispatch('sales/afip/getImportes', this.selected_sales[0])
			.then(() => {
				this.$bvModal.show('afip-details')
			})
		},
		selectAll() {
			this.$store.commit('sales/setAllSalesSelected', true)
		},
		deselectAll() {
			this.$store.commit('sales/setAllSalesSelected', false)
		},
	}
}
</script>