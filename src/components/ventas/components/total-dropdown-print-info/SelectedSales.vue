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
			v-if="selected_sales.length == 1"
			@click="showAfipDetails()">
				<i class="icon-clipboard"></i>
				Boleta						
			</b-dropdown-item>
			<b-dropdown-item
			v-if="selected_sales.length == 1"
			@click="checkSale()">
				<i class="icon-clipboard"></i>
				Check				
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
export default {
	computed: {
		selected_sales() {
			return this.$store.state.sales.selected_sales
		},
	},
	methods: {
		checkSale() {
			this.$axios.get('check-sale/'+this.selected_sales[0].id)
			.then(() => {
				this.$toast.success('Venta checkeada')
			})
			.catch(err => {
				console.log(err)
			})
		},
		showAfipDetails(sale) {
			this.$store.dispatch('sales/afip/getImportes', this.selected_sales[0])
			this.$bvModal.show('afip-details')
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