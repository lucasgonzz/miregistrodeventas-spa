<template>
<b-row>
	<b-col 
	cols="12"
	md="10"
	lg="8"
	class="col-info">
		<b-button-group class="btn-group-totales">
			<b-button
			variant="success">
				<span v-show="is_loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!is_loading">
					Total: {{ price(total) }}
				</span>
			</b-button>
			<b-button
			v-show="total_cost != 0 && hasPermissionTo('article.index.cost', user)"
			variant="danger">
				<span v-show="is_loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!is_loading">
					Total costos: {{ price(total_cost) }}
				</span>
			</b-button>
		</b-button-group>
	</b-col>
	<b-col
	class="col-ver"
	cols="12"
	md="2"
	:lg="selected_sales_length ? '1' : '4'">
		<b-dropdown text="Mas" right>
			<b-dropdown-item
			v-if="hasPermissionTo('client', user)"
			v-b-modal="'clients'">
				<i class="icon-user"></i>
				Clientes
			</b-dropdown-item>
			<b-dropdown-item
			v-if="isAdmin(user)"
			v-b-modal="'sales-times'">
				<i class="icon-clock-1"></i>
				Horarios de ventas
			</b-dropdown-item>
			<b-dropdown-item 
			v-show="isAdmin(user) && !showing_statistics"
			@click="showStatistics">
				<i class="icon-chart" v-show="!loading_statistics && !showing_statistics"></i>
				<span class="spinner-border spinner-border-sm" v-show="loading_statistics"></span>
				<span v-show="loading_statistics && showing_statistics">
					Calculando estadisticas, podria tardar unos segundos...
				</span>
				<span v-show="!loading_statistics">
					Estadisticas
				</span>
			</b-dropdown-item>
		</b-dropdown>
	</b-col>
	<b-col
	class="col-selected-sales"
	cols="12"
	lg="3">
		<b-dropdown
		variant="success"
		v-show="selected_sales_length"
		:text="text_selected_sales">
			<b-dropdown-item 
			v-if="canUse('sale.print', user)"
			v-b-modal="'print-sales'"
			:class="selected_sales_length ? '' : 'disabled'">
				<i class="icon-print"></i>
				Pdf/Imprimir
			</b-dropdown-item>
			<b-dropdown-item 
			v-b-modal="'delete-sales'"
			:class="selected_sales_length ? '' : 'disabled'">
				<i class="icon-trash-3"></i>
				Eliminar
			</b-dropdown-item>
		</b-dropdown>
	</b-col>
</b-row>
</template>
<script>
export default {
	props: [
		'user', 
		'showing_statistics', 'loading_statistics',
		'sales', 'total_articles', 'total', 'total_cost',
		'showing_only_with_card_sales',
		'is_loading',
		'sales_length', 'selected_sales',
	],
	computed: {
		text_selected_sales() {
			return	`${this.selected_sales.selected_sales.length} x ${this.getTotalSelectedSales()}`
		},
		selected_sales_length() {
			if (this.selected_sales.selected_sales.length) {
				return true
			}
			return false
		}
	},
	methods: {
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

		getTotalSelectedSales() {
			var total = 0
			this.sales.forEach(sale => {
				if (this.selected_sales.selected_sales.includes(sale.id)) {
					sale.articles.forEach(article => {
						if (article.uncontable == 1) {
							if (article.pivot.measurement == article.measurement) {
								total += parseFloat(article.pivot.price) * article.pivot.amount
							} else {
								total += parseFloat(article.pivot.price) * article.pivot.amount / 1000
							}
						} else {
							total += parseFloat(article.pivot.price) * article.pivot.amount
						}
					})
					if (sale.percentage_card) {
						var p = Number('1.'+parseInt(sale.percentage_card))
						total = total * p
					}
				}
			})
			return this.price(total)
		}
	},
}
</script>
<style scoped lang="sass">
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
	// @media screen and (min-width: 992px)
	display: flex
	justify-content: flex-end
.btn-group-totales 
	@media screen and (max-width: 778px)
		width: 100%
		.btn
			&:first-child, &:last-child
				border-radius: 0px	
</style>