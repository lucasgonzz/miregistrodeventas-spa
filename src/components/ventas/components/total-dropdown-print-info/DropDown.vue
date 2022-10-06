<template>
	<b-col 
	:offset-lg="offset_col_options"
	class="j-end"
	cols="12"
	lg="4">
		<b-button-group
		class="m-l-10">
			<b-button
			variant="primary">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					{{ to_show.length }} ventas
				</span>
			</b-button>
		</b-button-group>
		<b-dropdown text="Mas" right variant="primary" class="m-l-10">
			<!-- <b-dropdown-item
			v-if="can('client.index')"
			v-b-modal="'clients'">
				<i class="icon-user"></i>
				Clientes
			</b-dropdown-item> -->
			<b-dropdown-item
			v-b-modal="'commissioners'">
				<i class="icon-user"></i>
				Comisiones
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'sellers'">
				<i class="icon-user"></i>
				Vendedores
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'discounts'">
				<i class="icon-tag"></i>
				Descuentos
			</b-dropdown-item>
		</b-dropdown>
	</b-col>
</template>
<script>
export default {
	computed: {
		selected_sales() {
			return this.$store.state.sale.selected
		},
		offset_col_options() {
			if (this.selected_sales.length) {
				return 0
			}
			return 2
		},		
		loading() {
			return this.$store.state.sale.loading
		},
		to_show() {
			return this.$store.state.sale.to_show
		},
	}
}
</script>