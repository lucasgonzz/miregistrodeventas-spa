import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_sales from '@/store/vender/previus_sales'
import mixin_vender from '@/mixins/vender'
export default {
	namespaced: true,
	state: {
		previus_sale: {},
		index: 0,
		loading_previus: false,
		loading_next: false,
		updating: false,
	},
	mutations: {
		incrementIndex(state) {
			state.index++
		},
		decrementIndex(state) {
			state.index--
		},
		setIndex(state, value) {
			state.index = value
		},
		setPreviusSale(state, value) {
			state.previus_sale = value
		},
		setLoadingPrevius(state, value) {
			state.loading_previus = value
		},
		setLoadingNext(state, value) {
			state.loading_next = value
		},
		setUpdating(state, value) {
			state.updating = value
		},
	},
	actions: {
		previusSale({ commit, state }) {
			return axios.get('/api/sales/previus-next/'+state.index)
			.then(res => {
				console.log(res.data.sale)
				commit('setLoadingPrevius', false)
				commit('setLoadingNext', false)
				if (res.data.sale) {
					commit('setPreviusSale', res.data.sale)
				}
			})
			.catch(err => {
				commit('setLoadingPrevius', false)
				commit('setLoadingNext', false)
				console.log(err)
			})
		},
		updatePreviusSale({ commit, state }, info) {
			commit('setUpdating', true)
			return axios.put('/api/sales/'+state.previus_sale.id, {
				client_id: info.client_id,
				items: info.items,
				discounts_id: info.discounts_id,
				dolar_blue: info.dolar_blue,
				with_card: false,
			})
			.then(res => {
				commit('sale/updateSale', res.data.sale, {root: true})
				commit('sale/setToShow', null, {root: true})
				commit('setUpdating', false)
			})
			.catch(err => {
				commit('setUpdating', false)
				console.log(err)
			})
		},
	},
	modules: {
	}
}
