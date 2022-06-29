import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_days from '@/store/sales/previus_days'
import afip from '@/store/sales/afip'
export default {
	namespaced: true,
	state: {
		models: [],
		selected: [],
		from_date: [],
		to_show: [],

		details: null,

		selected_address: {street: 'todas'},

		only_date: '',
		total: 0,
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setModels(state, value) {
			state.models = value
		},
		setToShow(state, value = null) {
			if (value) {
				state.to_show = value
			} else {
				state.to_show = state.models
			}
		},
		add(state, value) {
			state.models.unshift(value)
		},
		setTotal(state) {
			state.total = 0
			state.total_cost = 0
			state.total_articles = 0
			state.without_cost = false
			let total_sale = 0
			state.to_show.forEach(sale => {
				sale.articles.forEach(article => {
					if (!article.pivot.cost || article.pivot.cost == 0) {
						state.without_cost = true
					}
					state.total += article.pivot.price * article.pivot.amount
					state.total_cost += parseFloat(article.pivot.cost) * article.pivot.amount
					state.total_articles += article.pivot.amount
				})

				sale.combos.forEach(combo => {
					if (!combo.pivot.cost || combo.pivot.cost == 0) {
						state.without_cost = true
					}
					state.total += combo.pivot.price * combo.pivot.amount
					state.total_articles += combo.pivot.amount
				})
				
				if (sale.percentage_card) {
					state.total = state.total + (state.total * sale.percentage_card / 100)
				}

				if (sale.discounts.length) {
					sale.discounts.forEach(dis => {
						state.total -= state.total * dis.pivot.percentage / 100
					})
				}

				if (sale.commissions.length) {
					sale.commissions.forEach(com => {
						state.total -= com.monto
					})
				}
			})
		},
		setDate(state, value) {
			state.only_date = value
		},
		setDetails(state, value) {
			state.details = value
		},
		setSelectedAddress(state, value) {
			state.selected_address = value
		},
		delete(state) {
			let index
			state.selected.forEach(selected_sale => {
				index = state.models.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.models.splice(index, 1)

				index = state.from_date.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.from_date.splice(index, 1)

				index = state.to_show.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.to_show.splice(index, 1)
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
		setSelected(state, value) {
			state.selected = value
		},
		setFromDate(state, value) {
			state.from_date = value
		},
	},
	actions: {
		getModels({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/sales')
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.sales)
				commit('setToShow', res.data.sales)
				commit('setTotal')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		getFromDate({ commit, state }) {
			commit('setLoading', true)
			return axios.get('/api/sales/from-date/'+state.only_date)
			.then(res => {
				commit('setLoading', false)
				commit('setFromDate', res.data.sales)
				commit('setToShow', res.data.sales)
				commit('setTotal')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			let sales_id = []
			state.selected.forEach(selected => {
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
		previus_days,
		afip,
	}
}
