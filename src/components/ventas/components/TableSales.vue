<template>
<b-row>
	<b-col>
		<div
		v-if="!loading">
			<b-table 
			class="shadow-2 b-r-1"
			v-show="sales.length"
			:items="items" 
			head-variant="dark" 
			:fields="fields" 
			responsive 
			ref="tableSales"
			hover 
			selectable 
			select-mode="multi"
			@row-selected="onRowSelected">
				<template #cell(selected)="{ rowSelected }">
					<template v-if="rowSelected">
						<span aria-hidden="true">
							<i class="icon-check text-primary"></i>
						</span>
					</template>
					<template v-else>
						<span aria-hidden="true">&nbsp;</span>
					</template>
				</template>
				<template #cell(ver)="data">
					<div class="j-start align-center">
						<b-button 
						class="btn-eye"
						@click="showSaleDetails(sales[data.index])">
							<i class="icon-eye"></i>
						</b-button>
						<b-badge
						v-if="sales[data.index].special_price_id"
						variant="success">
							{{ sales[data.index].special_price.name }}
						</b-badge>
					</div>
				</template>
				<template #cell(client)="data">
					<b-button
					v-if="sales[data.index].client || sales[data.index].buyer"
					@click="showCurrentAcounts(sales[data.index])"
					variant="link">
						{{ getClient(sales[data.index]) }}
					</b-button>
					<span v-else>
						<i class="icon-user-delete"></i>
					</span>
				</template>
			</b-table>
			<p 
			v-show="!sales.length"
			class="text-with-icon">
				<i class="icon-not"></i>
				No hay ventas
			</p>
		</div>
		<b-skeleton-table
			v-else
			:hide-header="false"
			:rows="8"
			:columns="10"
			:table-props="{ bordered: true, striped: true }"
		></b-skeleton-table>
	</b-col>
</b-row>
</template>
<script>
import numeral from 'numeral'
// Mixins
import Sales from '@/mixins/sales'
import Clients from '@/mixins/clients'
export default {
	name: 'TableSales',
	mixins: [Sales, Clients],
	computed: {
		all_sales_selected() {
			return this.$store.state.sales.all_sales_selected
		},
		sales() {
			return this.$store.state.sales.sales_to_show
		},
		loading() {
			return this.$store.state.sales.loading
		},
		items() {
			let items = []
			this.sales.forEach(sale => { 
				items.push({
					id: sale.id,
					afip_ticket: sale.afip_ticket,
					client: sale.client,
					articles: sale.articles,
					budgets: sale.budgets,
					date: sale.created_at,
					hour: this.hour(sale.created_at),
					cantidad_productos: this.getCantidadProducts(sale),
					cantidad_unidades: this.getCantidadUnidades(sale),
					cost: this.getTotalCostSale(sale),
					total: this.getTotalSale(sale, false),
					_rowVariant: this.getRowVariant(sale),
				})
			})
			return items
		},
		fields() {
			if (this.only_one_date != '' || this.to != '') {
				return [
					{ key: 'selected', label: '' },
					{ key: 'ver', label: 'Ver' },
					{ key: 'date', label: 'Fecha', formatter: 'date_format', sortable: true },
					{ key: 'hour', label: 'Hora', sortable: true },
					{ key: 'cantidad_productos', label: 'Cant. Productos', sortable: true },
					{ key: 'cantidad_unidades', label: 'Cant. Unidades', sortable: true },
					{ key: 'cost', label: 'Costo', sortable: true },
					{ key: 'total', sortable: true, formatter: 'total_format'},
					{ key: 'client', label: 'Cliente', sortable: true},
				]
			} else {
				return [
					{ key: 'selected', label: '' },
					{ key: 'ver', label: 'Ver' },
					{ key: 'hour', label: 'Hora', sortable: true },
					{ key: 'cantidad_productos', label: 'Cant. Productos', sortable: true },
					{ key: 'cantidad_unidades', label: 'Cant. Unidades', sortable: true },
					{ key: 'cost', label: 'Cost', sortable: true },
					{ key: 'total', sortable: true, formatter: 'total_format'},
					{ key: 'client', label: 'Cliente', sortable: true},
				]
			}
		},
	},
	watch: {
		all_sales_selected() {
			if (this.all_sales_selected) {
				this.$refs.tableSales.selectAllRows()
			} else {
				this.$refs.tableSales.clearSelected()
				console.log('engro')
			}
		}
	},
	methods: {
		getRowVariant(sale) {
			let variant = ''
			sale.impressions.forEach(impression => {
				if (impression.type == 'commerce') {
					if (variant == 'warning') {
						variant = 'primary'
					} else {
						variant = 'danger'
					}
				} else if (impression.type == 'client') {
					if (variant == 'danger') {
						variant = 'primary'
					} else {
						variant = 'warning'
					}
				}
			})
			return variant
			// if (sale.special_price) {
			// 	return 'success'
			// }
			// if (sale.percentage_card) {
			// 	return 'primary'
			// }
			// return ''
		},
		onRowSelected(items) {
			this.$store.commit('sales/setSelectedSales', items)
		},
		date_format(value) {
			return this.date(value)
		},
		total_format(value) {
			return this.price(value)
		},
		getSpecialPrice(sale) {
			return sale.special_price.name
		},
		getClient(sale) {
			if (sale.client) {
				return sale.client.name+' '+sale.client.surname
			}
			if (sale.buyer) {
				return sale.buyer.name
			}
			return '-'
		},
		getSaleDebt(sale) {
			if (sale.debt) {
				return '-'+this.price(this.getTotalSale(sale, false) - sale.debt)
			}
		},
		getCantidadProducts(sale) {
			return sale.articles.length + sale.combos.length
		},
		getCantidadUnidades(sale) {
			var cantidad_unidades = 0
			sale.articles.forEach(article => {
				cantidad_unidades += Number(article.pivot.amount)
			})
			sale.combos.forEach(combo => {
				cantidad_unidades += Number(combo.pivot.amount)
			})
			return cantidad_unidades
		},
		getCost(sale) {
			var cost = 0
			let without_cost = false
			sale.articles.forEach(article => {
				if (!article.pivot.cost) {
					without_cost = true
				}
				if (article.uncontable == 0) {
					cost += parseFloat(article.cost) * article.pivot.amount
				} else {
					if (article.pivot.measurement == article.measurement) {
						cost += parseFloat(article.pivot.cost) * article.pivot.amount
					} else {
						cost += parseFloat(article.pivot.cost) * article.pivot.amount / 1000
					}				
				}
			})
			if (without_cost) {
				return 'No disponible'
			} else {
				return numeral(cost).format('$0,0.00')
			}
		},
		// getArticleSpecialPriceForSale(sale, article) {
		// 	let result
		// 	if ()
		// 	article.special_prices.forEach(special_price => {
		// 		if (special_price.id == sale.special_price.id) {
		// 			result = special_price
		// 		}
		// 	})
		// 	return result
		// },
		getPrice(sale, formated = true) {
			var price = 0
			sale.articles.forEach(article => {
				if (article.uncontable == 0) {
					price += parseFloat(article.pivot.price) * article.pivot.amount
				} else {
					if (article.pivot.measurement == article.measurement) {
						price += parseFloat(article.pivot.price) * article.pivot.amount
					} else {
						price += parseFloat(article.pivot.price) * article.pivot.amount / 1000
					}				
				}
			})
            if (sale.percentage_card) {
                var p = Number('1.'+parseInt(sale.percentage_card))
                price = price * p
            }
			if (formated) {
				return numeral(price).format('$0,0.00')
			} else {
				return price
			}
		},
		selectAllSales() {
			this.$emit('selectAllSales')
		},
		showSaleDetails(sale) {
			this.$store.commit('sales/setSaleDetails', sale)
			this.$bvModal.show('sale-details')
		},
		printSale(sale) {
			this.$store.commit('sales/setSelectedSales', [sale])
			// this.$store.commit('sales/setPrint', sale)
			this.$bvModal.show('print-sales')
		},
		deleteSale(sale) {
			this.$store.commit('sales/setDelete', sale)
			this.$bvModal.show('delete-sales')
		}
	},
}
</script>
<style scoped lang="sass">
.badges
	.badge 
		margin: 0 .5em
.badge-percentage-card
	// position: absolute
	top: 10%
.badge-special-price
	// position: absolute
	top: 50%
.btn-eye 
	background: none
	color: #0069d9
	border: none
	font-size: 1.4em

</style>