import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_sales from '@/store/vender/previus_sales'
import mixin_vender from '@/mixins/vender'
export default {
	namespaced: true,
	state: {
		view: 0
	},
	mutations: {
		incrementView(state) {
			state.view++
		},
		decrementView(state) {
			state.view--
		},
		setView(state, value) {
			state.view = value
		}
	},
	actions: {
	},
	modules: {
	}
}
