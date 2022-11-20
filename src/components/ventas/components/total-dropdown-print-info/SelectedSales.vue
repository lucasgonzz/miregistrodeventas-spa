<template>
	<b-col
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
			v-if="selected_sales.length == 1"
			@click="printSales(selected_sales[0].id)">
				<i class="icon-print"></i>
				Imprimir
			</b-dropdown-item>
			<b-dropdown-item
			v-if="hasExtencion('combos') && selected_sales.length == 1"
			@click="printTicket(selected_sales[0])">
				<i class="icon-print"></i>
				Ticket
			</b-dropdown-item>
			<b-dropdown-item
			v-if="selected_sales.length == 1 && !selected_sales[0].afip_ticket"
			@click="afipTicket()">
				<i class="icon-clipboard"></i>
				Hacer Factura						
			</b-dropdown-item>
			<b-dropdown-item
			v-if="selected_sales.length == 1 && selected_sales[0].afip_ticket"
			@click="printAfipTicket(selected_sales[0])">
				<i class="icon-print"></i>
				Factura PDF
			</b-dropdown-item>
			<b-dropdown-item
			v-if="can('sale.delete')"
			v-b-modal="'delete-sales'">
				<i class="icon-trash"></i>
				Eliminar
			</b-dropdown-item>
		</b-dropdown>
	</b-col>
</template>
<script>
import print_sale from '@/mixins/print_sale'
import sale_ticket from '@/mixins/sale_ticket'
import afip_ticket from '@/mixins/afip_ticket'
export default {
	mixins: [print_sale, sale_ticket, afip_ticket],
	computed: {
		selected_sales() {
			return this.$store.state.sale.selected
		},
	},
	methods: {
		// callPrintSales() {
		// 	let ids = this.selected_sales.map(sale => sale.id)
		// 	this.printSales(ids.join('-'))
		// },
		afipTicket() {
			this.$bvModal.show('afip-confirmation')
		},
		selectAll() {
			this.$store.commit('sale/setAllSalesSelected', true)
		},
		deselectAll() {
			this.$store.commit('sale/setAllSalesSelected', false)
		},
	}
}
</script>