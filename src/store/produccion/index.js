import budgets from '@/store/produccion/budgets'
import order_productions from '@/store/produccion/order-productions/index'
export default {
	namespaced: true,
	modules: {
		budgets,
		order_productions,
	},
} 
