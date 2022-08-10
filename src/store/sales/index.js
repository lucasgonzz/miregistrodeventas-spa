import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_days from '@/store/sales/previus_days'
import afip from '@/store/sales/afip'
import sales_mixin from '@/mixins/sales'
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
		total_with_discounts: false,
		total_with_commissions: false,

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
		setTotalWithDiscounts(state, value) {
			state.total_with_discounts = value
		},
		setTotalWithCommissions(state, value) {
			state.total_with_commissions = value
		},
		setTotal(state) {
			state.without_cost = false
			state.total_articles = 0
			state.total_cost = 0
			state.total = 0
			let res
			state.to_show.forEach(sale => {
				res = sales_mixin.methods.getTotalSale(sale, false, state.total_with_discounts, state.total_with_commissions)
				state.without_cost = res.without_cost
				state.total_articles += res.total_articles
				state.total_cost += res.total_cost
				state.total += res.total
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
			let index = state.models.findIndex(sal => {
				return sal.id == sale.id
			})
			if (index != -1) {
				state.models.splice(index, 1, sale)
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
