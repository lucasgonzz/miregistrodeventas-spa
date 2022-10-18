import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import previus_days from '@/store/sales/previus_days'
import afip from '@/store/sales/afip'
import sales_mixin from '@/mixins/sales'

import moment from 'moment'
export default {
	namespaced: true,
	state: {
		models: [],
		selected: [],
		to_show: [],

		from_date: moment().format('YYYY-MM-DD'),
		until_date: '',

		details: null,
		afip_ticket: null,

		selected_address: {street: 'todas'},
		selected_employee: {street: 'todos'},

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
			let index = state.models.findIndex(item => {
				return item.id == value.id
			})
			if (index == -1) {
				state.models.unshift(value)
			} else {
				state.models.splice(index, 1, value)
			}
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
				console.log('llego total a sale_store: ')
				console.log(res.total)
				state.total += res.total
			})
		},
		setDate(state, value) {
			state.only_date = value
		},
		setDetails(state, value) {
			state.details = value
		},
		setAfipTicket(state, value) {
			state.afip_ticket = value
		},
		setSelectedAddress(state, value) {
			state.selected_address = value
		},
		setSelectedEmployee(state, value) {
			state.selected_employee = value
		},
		delete(state) {
			let index
			state.selected.forEach(selected_sale => {
				index = state.models.findIndex(sale => {
					return sale.id == selected_sale.id
				})
				state.models.splice(index, 1)

				// index = state.to_show.findIndex(sale => {
				// 	return sale.id == selected_sale.id
				// })
				// state.to_show.splice(index, 1)
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
		setUntilDate(state, value) {
			state.until_date = value
		},
	},
	actions: {
		getModels({ commit, state }) {
			commit('setLoading', true)
			let url = '/api/sale/'+state.from_date
			if (state.until_date != '') {
				url += '/'+state.until_date
			}
			return axios.get(url)
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.models)
				commit('setToShow')
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
			return axios.delete('api/sale/'+sales_id.join('-'))
			.then(res => {
				commit('delete')
				commit('setToShow')
			})
			.catch(err => {
				console.log(err)
			})
		},
		makeAfipTicket({ commit, state }) {
			return axios.post('api/sale/make-afip-ticket/'+state.selected[0].id)
			.then(res => {
				console.log(res)
				commit('add', res.data.model)
				commit('setToShow')
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
