<template>
<div id="ventas">	
	<clients 
	@salesFromClient="salesFromClient"></clients>
	<sales-times 
	@getSalesTimes="getSalesTimes"></sales-times>
	<summary 
	:sales="sales"></summary>
	<from-date 
	@fromDate="fromDate"
	@onlyOneDate="onlyOneDate"></from-date>
	<sale-details 
	:sale="sale"
	:user="user"
	@salesFromClient="salesFromClient"></sale-details>
	<print-sales :sales_id="selected_sales.selected_sales"></print-sales>
	<confirm-delete-sales 
	:deleting_sales="deleting_sales"
	:selected_sales="selected_sales.selected_sales"
	@deleteSales="deleteSales"></confirm-delete-sales>
	<b-row>
		<b-col>
			<b-card no-body header-class="al-borde">
				<template v-slot:header>
					<card-header
					:is_from_date="is_from_date"
					:from="from"
					:to="to"
					:is_from_only_one_date="is_from_only_one_date"
					:only_one_date="only_one_date"
					:sales_from_client="sales_from_client"
					:client="client"
					:showing_statistics="showing_statistics"
					:user="user"
					@removeSalesFromClient="removeSalesFromClient"
					@getSales="getSales"
					@onlyOneDate="onlyOneDate"
					@today="today"></card-header>
				</template>
				<b-card-body class="al-borde"> 
					<b-container fluid>
						<card-body-header 
						:user="user" 
						:showing_statistics="showing_statistics"
						:loading_statistics="loading_statistics"
						:sales="sales"
						:total_articles="total_articles"
						:total="total"
						:total_cost="total_cost"
						:is_loading="is_loading"
						:showing_only_with_card_sales="showing_only_with_card_sales"
						:sales_length="sales.length"
						:selected_sales="selected_sales"
						@showStatistics="showStatistics"
						@salesWithCard="salesWithCard"></card-body-header>

						<sales-times-nav 
						v-if="canUse('sale_time', user)"
						:showing_statistics="showing_statistics"
						:sales_times="sales_times"
						:sale_time="sale_time"
						:sales="sales"
						:is_from_date="is_from_date"
						:user="user"
						:sales_from_client="sales_from_client"
						@getAllSales="getAllSales"
						@hasPermissionToShowSaleTime="hasPermissionToShowSaleTime"
						@changeSaleTime="changeSaleTime"></sales-times-nav>
						<!-- Termina menu de horarios de ventas -->

						<!-- Cargando -->
						<cargando :is_loading="is_loading" size="md"></cargando>
						<!-- Termina cargando -->

						<!-- Tabla para mostrar las ventas -->
						<table-sales :showing_statistics="showing_statistics" 
									:is_loading="is_loading" 
									:sales="sales"
									:selected_sales="selected_sales"
									:is_from_date="is_from_date"
									:is_from_only_one_date="is_from_only_one_date"
									:sales_from_client="sales_from_client"
									:mostrar_entrego="mostrar_entrego"
									:show_date="show_date"
									:user="user"
									@selectAllSales="selectAllSales"
									@showSaleDetails="showSaleDetails"
									@changeEntrego="changeEntrego"></table-sales>
						<!-- Termina la tabla para mostrar las ventas -->

						<chart :statistics="statistics" 
								:user="user"
								:sales_times_length="sales_times.length"
								v-show="showing_statistics && !is_loading"></chart>

						<!-- Mensaje si no hay ventas -->
						<no-sales
						:showing_statistics="showing_statistics"
						:sales="sales"
						:is_loading="is_loading"
						></no-sales>
					</b-container>

				</b-card-body>
			</b-card>
		</b-col>
	</b-row>
</div>
</template>
<script>
// Librerias
import moment from 'moment'

// Modals
import FromDate from '../components/ventas/modals/FromDate.vue'
import SaleDetails from '../components/ventas/modals/SaleDetails.vue'
import ConfirmDeleteSales from '../components/ventas/modals/ConfirmDeleteSales.vue'
import PrintSales from '../components/ventas/modals/PrintSales.vue'
import SalesTimes from '../components/ventas/modals/SalesTimes.vue'
import Clients from '../components/ventas/modals/Clients.vue'

// Componentes
import Cargando from '../components/common/Cargando.vue'
import CardHeader from '../components/ventas/components/CardHeader.vue'
import CardBodyHeader from '../components/ventas/components/CardBodyHeader.vue'
import NoSales from '../components/ventas/components/NoSales.vue'
import SalesTimesNav from '../components/ventas/components/SalesTimesNav.vue'
import TableSales from '../components/ventas/components/TableSales.vue'
import Chart from '../components/ventas/components/Chart.vue'


export default {
	components: {
		// Modals
		FromDate,
		SaleDetails,
		ConfirmDeleteSales,
		PrintSales,
		// Summary,
		SalesTimes,
		Clients,

		// Components
		Cargando,
		CardHeader,
		CardBodyHeader,
		NoSales,
		// SelectedSalesOptions,
		SalesTimesNav,
		TableSales,
		Chart,
	},
	data() {
		return {
			// Statistics
			statistics: {
				first: {
					labels: [],
					datasets: [
						{
							label: '',
							backgroundColor: '#38c172',
							data: [],
						}
					],
				},
				second: {
					pie: [],
				},
			},
			showing_statistics: false,
			loading_statistics: false,

			// Cargando...
			is_loading: false,
			is_from_date: false,
			is_from_only_one_date: false,
			deleting_sales: false,

			// Clientes
			sales_from_client: false,
            clients: [],
            loading_clients: false,
			client: {},
			mostrar_entrego: true,

			// Buscar por fechas
			only_one_date: '',
			from: '',
			to: '',

			// Horarios de ventas
			sales_times: [],
			sale_time: 0,
			show_date: false,

			// Se usa para mostrar las ventas con tarjeta
			previus_sales: [],

			sales: [],
			showing_only_with_card_sales: false,
			sale: {},
			total: 0,
			total_cost: 0,
			total_articles: 0,
			last_day_inclusive: false,
			selected_sales: {
				is_all_selected: false,
				selected_sales: [],
				// selected_pages: [],
			},
			selectAllProperty: false,

			is_desktop: false,
		}
	},
	computed: {
		user() {
			return this.$store.state.auth.user
		}
	},
	watch: {
		sales() {
			this.total = 0
			this.total_cost = 0
			this.total_articles = 0
			let without_cost = false
			this.sales.forEach(sale => {
				sale.articles.forEach(article => {
					if (!article.pivot.cost || article.pivot.cost == 0) {
						without_cost = true
					}
					if (article.uncontable == 1) {
						if (article.pivot.measurement == article.measurement) {
							this.total += parseFloat(article.pivot.price) * article.pivot.amount
							this.total_cost += parseFloat(article.pivot.cost) * article.pivot.amount
						} else {
							this.total += parseFloat(article.pivot.price) * article.pivot.amount / 1000
							this.total_cost += parseFloat(article.pivot.cost) * article.pivot.amount / 1000
						}
					} else {
						this.total += parseFloat(article.pivot.price) * article.pivot.amount
						this.total_cost += parseFloat(article.pivot.cost) * article.pivot.amount
					}
					this.total_articles++
				})
				if (sale.percentage_card) {
					this.total = this.total + (this.total * sale.percentage_card / 100)
				}
			})
			if (without_cost) {
				this.total_cost = 0
			}
		}
	},
	methods: {
		setInitIndex() {
			
		},
		// Header title
		removeSalesFromClient() {
			this.sales_from_client = false
			this.getSales()
		},

		// Header buttons
		today() {
			this.is_from_date = false
			this.is_from_only_one_date = false
			this.showing_statistics = false
			this.only_one_date = ''
			this.getSales()
		},
		showStatistics() {
			if (!this.showing_statistics) {
				this.showing_statistics = true
				this.is_loading = true
				this.loading_statistics = true
				this.$api.get('sales/statistics')
				.then(res => {
					var response = res.data
					this.statistics.first.labels = response.first.labels
					this.statistics.first.datasets[0].label = 'Recaudado'
					this.statistics.first.datasets[0].backgroundColor = '#38c172'
					this.statistics.first.datasets[0].data = response.first.data

					let index = 0
					response.second.data.forEach(data => {
						let obj = {
							labels: response.second.labels,
							datasets: [
								{
									label: response.first.labels[index],
									// backgroundColor: '#38c172',
									backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'],
									data: data
								}
							],
						}
						this.statistics.second.pie.push(obj)
					})

					this.is_loading = false
					this.loading_statistics = false

					// this.formatStatistics()
				})
				.catch(err => {
					console.log(err)
				})
			} else {
				this.showing_statistics = false
			}
		},

		// Card header
		salesWithCard() {
			if (!this.showing_only_with_card_sales) {
				var sales = []
				this.sales.forEach(sale => {
					if (!sale.percentage_card === null) {
						sales.push(sale)
					} 
				})
				this.showing_only_with_card_sales = true
				this.previus_sales = this.sales
				this.sales = sales
			} else {
				this.showing_only_with_card_sales = false
				this.sales = this.previus_sales
			}
		},

		// Clientes
		// getClients() {
		// 	this.loading_clients = true
		// 	this.$api.get('clients')
		// 	.then(res => {
		// 		this.loading_clients = false
		// 		this.clients = res.data
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 		this.loading_clients = false
		// 	})
		// },
        // Cunado se busca un cliente se setean desde este metodo
		setClients(clients) {
			this.clients = clients
		},
		salesFromClient(client) {
			this.is_loading = true
			this.is_from_only_one_date = false
			this.is_from_date = false
			this.$api.get('sales/client/'+client.id)
			.then(res => {
				this.client = client
				this.sales_from_client = true
				this.is_loading = false
				this.sales = res.data
			})
			.catch(err => {
				this.is_loading = false
				this.$toast.error('Error al buscar las ventas de '+client.name+', recargue la página e intente denuevo, por favor')
				console.log(err)
			})
		},

		// Horarios de ventas
		// Obtinene los horarios de ventas
        getSalesTimes() {
            this.$api.get('sale-time')
            .then(res => {
                this.sales_times = res.data
                this.formatSalesTimes()
				this.getSales()
            })
            .catch(err => {
                console.log(err)
            })
        },
		formatSalesTimes() {
			if (this.sales_times.length) {
				var first_sale_time = this.sales_times[0]
				var horaInicio = moment(first_sale_time.from, 'h:mma')
				var horaFin = moment(first_sale_time.to, 'h:mma')
				if (!horaInicio.isBefore(horaFin)) {
					var end_sale_time = {
						id: -1,
						id_to_send: first_sale_time.id,
						name: first_sale_time.name,
						from: first_sale_time.from,
						to: first_sale_time.to + ' >',
						showInModal: false,
					}
					first_sale_time.from = '< '+ first_sale_time.from
					this.sales_times.push(end_sale_time)
				}
			}
		},

        // se fija si puede ver las ventas de cualquier horario
		hasPermissionToShowAllSales() {
			var has_permission = false
			if (this.sales_times.length) {
				this.user.roles.forEach(rol => {
					if (rol.slug == 'owner') {
						has_permission = true
					}
				})
				if (!has_permission) {
					this.user.permissions.forEach(permission => {
						if (permission.slug == 'sale.index.all') {
							has_permission = true
						}
					})
				}
			} else {
				has_permission = true
			}
			return has_permission
		},
		hasPermissionToShowSaleTime(sale_time) {
			var has_permission = false
			if (this.user.roles) {
				this.user.roles.forEach(rol => {
					if (rol == 'owner') {
						has_permission = true
					}
				})
			}
			if (!has_permission) {
				this.user.permissions.forEach(permission => {
					if (!has_permission) {
						if (permission.name === sale_time.name) {
							has_permission = true
						}
					}
				})
			}
			return has_permission
		},

		// Clientes
		changeEntrego() {
			if (this.mostrar_entrego) {
				this.mostrar_entrego = false
			} else {
				this.mostrar_entrego = true
			}
		},

		// Ventas seleccionadas
		selectAllSales() {
			if (!this.selected_sales.is_all_selected) {
				console.log('no estan seleccionadas')
				this.sales.forEach(sale => {
					if (!this.selected_sales.selected_sales.includes(sale.id)) {
						this.selected_sales.selected_sales.push(sale.id)
					}
				})
			} else {
				console.log('estan seleccionadas')
				this.sales.forEach(sale => {
					var i = this.selected_sales.selected_sales.indexOf(sale.id)
					this.selected_sales.selected_sales.splice(i, 1)
				})
				// this.selected_sales.selected_pages.splice(index, 1)
			}
		},
		deleteSales() {
			this.deleting_sales = true
			this.$api.delete('sales/delete-sales/'+this.selected_sales.selected_sales.join('-'))
			.then(() => {
				if (this.selected_sales.selected_sales.length > 1) {
					this.$toast.success('Se eliminaron correctamente las '+this.selected_sales.selected_sales.length+' ventas')
				} else {
					this.$toast.success('Se elimino correctamente la venta')
				}
				this.deleting_sales = false
				this.selected_sales.selected_sales = []
				this.selected_sales.is_all_selected = false
				if (this.is_from_date) {
					this.fromDate()
				} else {
					this.getSales()
				}
				this.$bvModal.hide('delete-sales')
			})
			.catch(err => {
				this.deleting_sales = false
				console.log(err)
			})
		},
		confirmDeleteSale(sale) {
			this.sale = sale
			this.$bvModal.show('delete-sales')
		},
		deleteSale() {
			this.$api.delete('sales/'+this.sale.id)
			.then(() => {
				this.sale = {}
				if (this.is_from_date) {
					this.fromDate()
				} else {
					this.getSales()
				}
				this.$bvModal.hide('delete-sales')
				this.$toast.success('Venta eliminada correctamente')
			})
			.catch(err => {
				console.log(err)
			})
		},

		getAllSales() {
			if (this.is_from_date) {
				this.fromDate()
			} else  if (this.is_from_only_one_date) {
				this.onlyOneDate(this.only_one_date)
			} else {
				this.getSales()
			}
			this.sale_time = 0
		},

		// Desde una fecha
		showFromDate() {
			this.$bvModal.show('from-date')
		},
		fromDate(from = this.from, to = this.to, last_day_inclusive = this.last_day_inclusive) {
			this.is_loading = true
			this.$bvModal.hide('from-date')
			this.from = from
			this.to = to
			if (last_day_inclusive == '0') {
				this.last_day_inclusive = false
			} else {
				this.last_day_inclusive = true
			}
			this.$api.get('sales/from-date/'+this.from+'/'+this.to+'/'+last_day_inclusive)
			.then(res => {
				this.is_loading = false
				if (res.data == false) {
					this.$toast.error('No hay ventas entre estas fechas')
					this.getSales()
				} else {
					this.sales = res.data
					this.is_from_only_one_date = false
					this.is_from_date = true
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
		onlyOneDate(date) {
			this.only_one_date = date			
			this.is_loading = true
			// if (this.hasPermissionToShowAllSales()) {
				this.$bvModal.hide('from-date')
				this.$api.get('sales/only-one-date/'+date)
				.then(res => {
					this.is_loading = false
					// Se falsea que se estan mostrando las ventas de un cliente
					// para que no aparesca el nombre del cliente en el titulo
					this.sales_from_client = false
					this.selected_sales.is_all_selected = false
					this.is_from_only_one_date = true
					this.sale_time = 0
					this.sales = res.data
					if (!this.hasPermissionToShowAllSales()) {
						this.changeSaleTimeAllowed()
					}
				})
				.catch(err => {
					console.log(err)
				})
			// } else {
			// 	this.changeSaleTimeAllowed()
			// }
		},
		changeSaleTimeAllowed() {
			var permiso_encontrado = false
			this.sales_times.forEach(sale_time => {
				if (!permiso_encontrado) {
					if (this.hasPermissionToShowSaleTime(sale_time)) {
						this.changeSaleTime(sale_time)
						permiso_encontrado = true
					}
				}
			})
		},
		changeSaleTime(sale_time) {
			console.log('changeSaleTime')
			this.is_loading = true
			var link = 'sales/from-sale-time/'
			var horaInicio = moment(sale_time.from, 'h:mma')
			var horaFin = moment(sale_time.to, 'h:mma')
			if (!horaInicio.isBefore(horaFin)) {
				this.show_date = true
			} else {
				this.show_date = false
			}
			if (sale_time.showInModal) {
				link += sale_time.id + '/0/'
			} else {
				link += sale_time.id_to_send + '/1/' 
			}
			link += this.only_one_date
			console.log(`link: ${link}`)
			this.$api.get(link)
			.then(res => {
				this.is_loading = false
				this.sales = res.data
				if (this.sale_time != sale_time.id) {
					this.sale_time = sale_time.id
				}
			})
			.catch(() => {
				this.changeSaleTime(sale_time)
			})
		},

		// Detalles de una venta
		showSaleDetails(sale) {
			this.sale = sale
			this.$bvModal.show('sale-details')
		},

		getSales() {
			if (this.hasPermissionToShowAllSales()) {
				this.is_loading = true
				this.$api.get('sales')
				.then(res => {
					this.is_from_only_one_date = false
					this.is_loading = false
					this.sales = res.data
					this.sale_time = 0
				})
				.catch(err => {
					console.log('error en get sales'+err)
				})
			} else {
				this.changeSaleTimeAllowed()
			}
		},

		// Selected sales
		selectAll() {
			if (this.selectAllProperty) {
				this.selected_sales = []
				this.sales.forEach( sale => {
					this.selected_sales.push(sale.id)
				})
			} else {
				this.selected_sales = []
			}
		},
	},
	created() {
		this.is_loading = true
		this.getSalesTimes()
	}
}
</script>
<style scoped>

.card-icon {
	font-size: 1.5rem
}
.spinner-border {
	margin-bottom: 3px;
}
.clients-results {
	position: absolute;
	top: 100%;
	width: 100%;
	z-index: 500;
}
</style>