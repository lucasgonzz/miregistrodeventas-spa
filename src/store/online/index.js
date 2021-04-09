import orders from '@/store/online/orders'
import questions from '@/store/online/questions'
export default {
	namespaced: true,
	state: {
		view: 'orders'
	},
	mutations: {
		setView(state, value) {
			state.view = value
		},
	},
	modules: {
		orders,
		questions,
	},
}
