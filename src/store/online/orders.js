import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		unconfirmed_orders: [],
		unconfirmed_order_details: {},
		confirmed_finished_orders: [],
		confirmed_finished_order_details: [],
		loading_unconfirmed_orders: false,
		loading_confirmed_finished_orders: false,
		cancel: {},
	},
	mutations: {
		setUnconfirmedOrders(state, orders) {
			state.unconfirmed_orders = orders
		},
		setUnconfirmedOrderDetails(state, orders) {
			state.unconfirmed_order_details = orders
		},
		setConfirmedFinishedOrders(state, value) {
			state.confirmed_finished_orders = value
		},
		setConfirmedFinishedOrderDetails(state, value) {
			state.confirmed_finished_order_details = value
		},
		setLoadingConfirmedFinishedOrders(state, value) {
			state.loading_confirmed_finished_orders = value
		},
		addUnconfirmedOrder(state, order) {
			let index = state.unconfirmed_orders.findIndex(o => {
				return o.id == order.id
			})
			if (index == -1) {
				state.unconfirmed_orders.push(order)
			}
		},
		setLoadingUnconfirmedOrders(state, value) {
			state.loading_unconfirmed_orders = value
		},
		setCancel(state, value) {
			state.cancel = value
		},
	},
	actions: {
		getUnconfirmedOrders({ commit }) {
			commit('setLoadingUnconfirmedOrders', true)
			axios.get('/api/orders/unconfirmed')
			.then(res => {
				commit('setLoadingUnconfirmedOrders', false)
				commit('setUnconfirmedOrders', res.data.orders)
				console.log('setUnconfirmedOrders', res.data.orders)
			})
			.catch(err => {
				commit('setLoadingUnconfirmedOrders', false)
				console.log(err)
			})
		},
		getConfirmedFinishedOrders({ commit }) {
			commit('setLoadingConfirmedFinishedOrders', true)
			axios.get('/api/orders/confirmed-finished')
			.then(res => {
				commit('setLoadingConfirmedFinishedOrders', false)
				commit('setConfirmedFinishedOrders', res.data.orders)
			})
			.catch(err => {
				commit('setLoadingConfirmedFinishedOrders', false)
				console.log(err)
			})
		},
	},
	modules: {
	}
}
