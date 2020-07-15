<template>
<div class="row" v-show="!is_loading && sales.length && !showing_statistics">
	<div class="col col-sm-al-borde">
		<div class="table-responsive">
			<table class="table table-striped text-center">
				<thead class="thead-dark">
					<tr>
						<th>
							<b-form-checkbox
							id="is_all_selected"
							v-model="selected_sales.is_all_selected" 
							@change="selectAllSales"></b-form-checkbox>
						</th>
						<th scope="col">Ver</th>
						<th v-show="is_from_date || is_from_only_one_date || sales_from_client || show_date" scope="col">
							Fecha
						</th>
						<th scope="col">Hora</th>
						<th scope="col" class="d-none d-md-table-cell">Cant. Artículos</th>
						<th scope="col" class="d-none d-md-table-cell">Cant. Unidades</th>
						<th scope="col" v-show="hasPermissionTo('article.index.cost', user)">Costo</th>
						<th scope="col">Total</th>
						<th>Cliente</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="sale in sales"
					:key="sale.id"
						:class="selected_sales.selected_sales.includes(sale.id) ? 'bg-warning' : ''">
						<td>
							<b-form-checkbox
							:value="sale.id"
							v-model="selected_sales.selected_sales"></b-form-checkbox>
						</td>
						<td class="td-options">
							<b-button 
							class="btn-eye"
							@click="showSaleDetails(sale)">
								<i class="icon-eye"></i>
							</b-button>
						</td>
						<td v-show="is_from_date || is_from_only_one_date || sales_from_client || show_date">
							<i class="icon-calendar"></i>
							{{ date(sale.created_at) }}
						</td>
						<td>
							<i class="icon-clock-1"></i>
							{{ hour(sale.created_at) }}
						</td>
						<td
						class="d-none d-md-table-cell">{{ getCantidadArticulos(sale) }}</td>
						<td
						class="d-none d-md-table-cell">{{ getCantidadUnidades(sale) }}</td>
						<td scope="row" v-show="hasPermissionTo('article.index.cost', user)">
							{{ getCost(sale) }}
						</td>
						<td scope="row">
							{{ getPrice(sale) }}
							<i v-show="sale.percentage_card != null"
								class="icon-credit-card text-primary card-icon"></i>
						</td>
						<td v-if="sale.client">
							<strong v-if="sale.debt"
									class="text-danger">
								<i class="icon-user"></i>
								{{ sale.client.name }}
								<p class="c-p"
									@click="changeEntrego">
									<i class="icon-undo"></i>
									<span v-show="mostrar_entrego">
										(entrego {{ price(sale.debt) }})
									</span>
									<span v-show="!mostrar_entrego">
										(debe {{ price(getPrice(sale, false) - sale.debt) }})
									</span>
								</p>
							</strong>
							<span v-else>
								<i class="icon-user"></i>
								{{ sale.client.name }}
							</span>
						</td>
						<td v-else>
							<i class="icon-user-delete"></i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>
<script>
import numeral from 'numeral'
export default {
	props: [
		'showing_statistics',
		'is_loading', 'sales', 'selected_sales', 
		'is_from_date', 'is_from_only_one_date',
		'sales_from_client', 
		'mostrar_entrego',
		'show_date', 'user',
		],
	methods: {
		getCantidadArticulos(sale) {
			return sale.articles.length
		},
		getCantidadUnidades(sale) {
			var cantidad_unidades = 0
			sale.articles.forEach(article => {
				if (article.uncontable == 0) {
					cantidad_unidades += article.pivot.amount
				} else {
					cantidad_unidades ++
				}
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
			this.$emit('showSaleDetails', sale)
		},
		changeEntrego() {
			this.$emit('changeEntrego')
		}
	},
}
</script>
<style scoped lang="sass">
.btn-eye 
	background: none
	color: #0069d9
	border: none
	font-size: 1.4em
</style>