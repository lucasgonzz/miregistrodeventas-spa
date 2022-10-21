import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import days_previus_sales from '@/store/sales/days_previus_sales'
import clients from '@/store/sales/clients'
import afip from '@/store/sales/afip'
import general from '@/mixins/general'
export default {
	namespaced: true,
	state: {
		sales: [],
		sales_to_show: [],
		total: 0,
		total_cost: 0,
		total_articles: 0,
		without_cost: false,
		from: '',
		to: '',
		last_day_inclusive: false,
		only_one_date: '',
		loading: false,
		sale_details: {},
		sale_to_print: {},
		selected_client: null,
		selected_sales: [],
		all_sales_selected: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setSales(state, value) {
			state.sale = value
		},
		setSalesToShow(state, value = null) {
			if (value) {
				state.sale_to_show = value
			} else {
				state.sale_to_show = state.sale
			}
		},
		setSelectedClient(state, value) {
			state.selected_client = value
		},
		addSale(state, value) {
			state.sale.unshift(value)
		},
		setTotal(state) {
			state.total = 0
			state.total_cost = 0
			state.total_articles = 0
			state.without_cost = false
			let total_sale = 0
			state.sale_to_show.forEach(sale => {
				console.log(sale)
				sale.articles.forEach(article => {
					if (!article.pivot.cost || article.pivot.cost == 0) {
						state.without_cost = true
					}
					total_sale += general.methods.articlePrice(article, true, false) * article.pivot.amount
					// total_sale += parseFloat(article.pivot.price) * article.pivot.amount
					state.total_cost += parseFloat(article.pivot.cost) * article.pivot.amount
					state.total_articles++
				})

				sale.combos.forEach(combo => {
					if (!combo.pivot.cost || combo.pivot.cost == 0) {
						state.without_cost = true
					}
					total_sale += combo.pivot.price * combo.pivot.amount
					state.total_articles++
				})
				
				if (sale.percentage_card) {
					total_sale = total_sale + (total_sale * sale.percentage_card / 100)
				}
				if (sale.discounts.length) {
					sale.discounts.forEach(dis => {
						total_sale -= total_sale * dis.pivot.percentage / 100
					})
				}
				if (sale.commissions.length) {
					sale.commissions.forEach(com => {
						total_sale -= com.monto
					})
				}
				state.total += total_sale
				total_sale = 0
			})
		},
		setOnlyOneDate(state, value) {
			state.only_one_date = value
		},
		setFrom(state, value) {
			state.from = value
		},
		setTo(state, value) {
			state.to = value
		},
		setLastDayInclusive(state, value) {
			state.last_day_inclusive = value
		},
		setSaleDetails(state, value) {
			state.sale_details = value
		},
		setPrint(state, value) {
			state.sale_to_print = value
		},
		setDelete(state, value) {
			state.sale_to_delete = value
		},
		delete(state) {
			let index
			state.selected_sales.forEach(selected_sale => {
				index = state.sale.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.sale.splice(index, 1)
				console.log('se eliminio la venta con indice '+index)
				index = state.sale_to_show.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.sale_to_show.splice(index, 1)
				console.log('se eliminio la venta to show con indice '+index)
			})
		},
		updateSale(state, sale) {
			let index = state.sale.findIndex(sal => {
				return sal.id == sale.id
			})
			if (index != -1) {
				state.sale.splice(index, 1, sale)
			}
		},
		setSelectedSales(state, value) {
			state.selected_sales = value
		},
		setAllSalesSelected(state, value) {
			state.all_sales_selected = value
		},
	},
	actions: {
		getSales({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/sales')
			.then(res => {
				commit('setLoading', false)
				commit('setSales', res.data.sales)
				commit('setSalesToShow', res.data.sales)
				commit('setTotal')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			let sales_id = []
			state.selected_sales.forEach(selected => {
				sales_id.push(selected.id)
			})
			return axios.delete('api/sales/'+sales_id.join('-'))
			.then(res => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
	modules: {
		days_previus_sales,
		clients,
		afip,
	}
}