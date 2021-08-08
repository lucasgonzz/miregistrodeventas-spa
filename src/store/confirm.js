import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		text: '',
		variant: '',
		btn_text: '',
		confirmed: '',
	},
	mutations: {
		setText(state, value) {
			state.text = value
		},
		setVariant(state, value) {
			state.variant = value
		},
		setBtnText(state, value) {
			state.btn_text = value
		},
		setConfirmed(state, value) {
			state.confirmed = value
		},
	},
	actions: {
	},
	modules: {
	}
}
