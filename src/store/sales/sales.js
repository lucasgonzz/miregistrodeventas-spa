import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import days_previus_sales from '@/store/sales/days_previus_sales'
import clients from '@/store/sales/clients'
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
		sale_to_delete: {},
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
			state.sales = value
		},
		setSalesToShow(state, value = null) {
			if (value) {
				state.sales_to_show = value
			} else {
				state.sales_to_show = state.sales
			}
		},
		setSelectedClient(state, value) {
			state.selected_client = value
		},
		addSale(state, value) {
			state.sales.unshift(value)
		},
		setTotal(state) {
			state.total = 0
			state.total_cost = 0
			state.total_articles = 0
			state.without_cost = false
			state.sales_to_show.forEach(sale => {
				sale.articles.forEach(article => {
					if (!article.pivot.cost || article.pivot.cost == 0) {
						state.without_cost = true
					}
					state.total += parseFloat(article.pivot.price) * article.pivot.amount
					state.total_cost += parseFloat(article.pivot.cost) * article.pivot.amount
					state.total_articles++
				})
				if (sale.percentage_card) {
					state.total = state.total + (state.total * sale.percentage_card / 100)
				}
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
				index = state.sales.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.sales.splice(index, 1)
				index = state.sales_to_show.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.sales_to_show.splice(index, 1)
			})
		},
		updateSale(state, sale) {
			let index = state.sales.findIndex(sal => {
				return sal.id == sale.id
			})
			if (index != -1) {
				state.sales.splice(index, 1, sale)
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
	},
	modules: {
		days_previus_sales,
		clients,
	}
}
