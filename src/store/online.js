import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		unconfirmed_orders: [],
		loading_unconfirmed_orders: false,

		questions: [],
	},
	mutations: {
		setUnconfirmedOrders(state, orders) {
			state.unconfirmed_orders = orders
		},
		addUnconfirmedOrder(state, order) {
			state.unconfirmed_orders.push(order)
		},
		setLoadingUnconfirmedOrders(state, value) {
			state.loading_unconfirmed_orders = value
		},

		setQuestions(state, questions) {
			state.questions = questions
		},
		addQuestion(state, question) {
			state.questions.push(question)
		}
	},
	actions: {
		getUnconfirmedOrders({ commit }) {
			commit('setLoadingUnconfirmedOrders', true)
			axios.get('/api/orders/unconfirmed')
			.then(res => {
				commit('setLoadingUnconfirmedOrders', false)
				commit('setUnconfirmedOrders', res.data.orders)
			})
			.catch(err => {
				commit('setLoadingUnconfirmedOrders', false)
				console.log(err)
			})
		},
		getQuestions({ commit }) {
			axios.get('/api/questions')
			.then(res => {
				commit('setQuestions', res.data.questions)
			})
			.catch(err => {
				console.log(err)
			})
		},
	}
}