import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import { VueOfflineStorage  } from 'vue-offline'
export default {
	namespaced: true,
	state: {
		location: null,
		title: '',
	},
	mutations: {
		setLocation(state, value) {
			state.location = value
		},
		setTitle(state, value) {
			state.title = value
		},
	},
	actions: {
	},
	modules: {
	}
}
