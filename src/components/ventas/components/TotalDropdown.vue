<template>
<b-row>
	<b-col 
	class="j-start"
	cols="12"
	md="6">
		<b-button-group class="btn-group-totales">
			<b-button
			v-intro-step="3"
			v-intro="'Total vendido en el día'"
			variant="success">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					Total: {{ price(total) }}
				</span>
			</b-button>
			<b-button
			v-if="total_cost != 0 && can('article.index.cost')"
			variant="danger">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					Total costos: {{ price(total_cost) }}
				</span>
			</b-button>
		</b-button-group>
	</b-col>
	<b-col 
	class="j-end"
	cols="12"
	md="6"
	lg="3">
		<b-button-group
		class="m-l-10">
			<b-button
			variant="primary">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					{{ sales_to_show.length }} ventas
				</span>
			</b-button>
		</b-button-group>
		<b-dropdown text="Mas" right variant="primary" class="m-l-10">
			<b-dropdown-item
			v-if="can('Ver clientes')"
			v-b-modal="'clients'">
				<i class="icon-user"></i>
				Clientes
			</b-dropdown-item>
			<b-dropdown-item
			v-if="isProvider()"
			v-b-modal="'commissioners'">
				<i class="icon-user"></i>
				Comisiones
			</b-dropdown-item>
			<b-dropdown-item
			v-if="isProvider()"
			v-b-modal="'discounts'">
				<i class="icon-sale-ticket"></i>
				Descuentos
			</b-dropdown-item>
			<b-dropdown-item
			v-if="isAdmin()"
			v-b-modal="'sales-times'">
				<i class="icon-clock-1"></i>
				Horarios de ventas
			</b-dropdown-item>
		</b-dropdown>
	</b-col>
	<b-col
	class="col-ver"
	v-if="selected_sales.length" 
	cols="12"
	lg="3">
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
			v-b-modal="'delete-sales'">
				<i class="icon-trash-3"></i>
				Eliminar
			</b-dropdown-item>
		</b-dropdown>
	</b-col>
	<b-col
	v-if="isProvider()"
	cols="12"
	class="j-end col-selected-sales">
		<b-list-group horizontal>
			<b-list-group-item>
				<i class="icon-print"></i>
				negocio
				<div class="color bg-danger"></div>
			</b-list-group-item>
			<b-list-group-item>
				<i class="icon-print"></i>
				cliente
				<div class="color bg-warning"></div>
			</b-list-group-item>
			<b-list-group-item>
				<i class="icon-print"></i>
				ambos
				<div class="color bg-primary"></div>
			</b-list-group-item>
		</b-list-group>
	</b-col>
</b-row>
</template>
<script>
import sale from '@/mixins/sales'
export default {
	name: 'TotalDropDownw',
	mixins: [sale],
	computed: {
		offset() {
			if (this.selected_sales.length) {
				return 0
			}
			return 4
		},		
		selected_sales() {
			return this.$store.state.sales.selected_sales
		},
		sales() {
			return this.$store.state.sales.sales
		},
		sales_to_show() {
			return this.$store.state.sales.sales_to_show
		},
		loading() {
			return this.$store.state.sales.loading
		},
		total() {
			return this.$store.state.sales.total
		},
		total_selected_sales() {
			let total = 0
			this.selected_sales.forEach(sale => {
				total += this.getTotalSale(sale, false)
			})
			return this.price(total)
		},
		total_cost() {
			return this.$store.state.sales.total_cost
		},
		total_articles() {
			return this.$store.state.sales.total_articles
		},
		all_sales_selected() {
			return this.$store.state.sales.all_sales_selected
		},
	},
	methods: {
		selectAll() {
			this.$store.commit('sales/setAllSalesSelected', true)
		},
		deselectAll() {
			this.$store.commit('sales/setAllSalesSelected', false)
		},
		clearSelectAll() {
		},
		salesWithCard() {
			this.$emit('salesWithCard')
		},
		cantCardSales() {
			var cantidad_sales = 0
			this.sales.forEach(sale => {
				if (!sale.percentage_card === null) {
					cantidad_sales++
				}
			})
			return cantidad_sales
		},
		showStatistics() {
			this.$emit('showStatistics')
		},

		// getTotalSelectedSales() {
		// 	var total = 0
		// 	this.sales.forEach(sale => {
		// 		if (this.selected_sales.selected_sales.includes(sale.id)) {
		// 			sale.articles.forEach(article => {
		// 				if (article.uncontable == 1) {
		// 					if (article.pivot.measurement == article.measurement) {
		// 						total += parseFloat(article.pivot.price) * article.pivot.amount
		// 					} else {
		// 						total += parseFloat(article.pivot.price) * article.pivot.amount / 1000
		// 					}
		// 				} else {
		// 					total += parseFloat(article.pivot.price) * article.pivot.amount
		// 				}
		// 			})
		// 			if (sale.percentage_card) {
		// 				var p = Number('1.'+parseInt(sale.percentage_card))
		// 				total = total * p
		// 			}
		// 		}
		// 	})
		// 	return this.price(total)
		// }
	},
}
</script>
<style scoped lang="sass">
.color
	display: inline-block
	margin-bottom: -5px
	width: 20px
	height: 20px
	border-radius: .3em
.col-12
	@media screen and (max-width: 992px)
		margin-bottom: 10px
		&:last-child
			margin-bottom: 0
.col-ver
	display: flex
	justify-content: flex-end

.col-info
	@media screen and (min-width: 778px)
		display: flex
		justify-content: flex-start
.col-selected-sales
	@media screen and (min-width: 992px)
		margin-top: 10px
.btn-group-totales 
	@media screen and (max-width: 768px)
		width: 100%
</style>