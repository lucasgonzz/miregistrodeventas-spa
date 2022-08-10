import orders from '@/store/online/orders/index'
import questions from '@/store/online/questions'
import examine from '@/store/online/examine'
import buyers from '@/store/online/buyers'
import messages from '@/store/online/messages'
import cupons from '@/store/online/cupons'
import calls from '@/store/online/calls'
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
		examine,
		buyers,
		messages,
		cupons,
		calls,
	},
}
