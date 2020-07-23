import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		articles_names: [],
		articles_names_loaded: false
	},
	getters: {
	},
	mutations: {
		setArticlesNames(state, value) {
			state.articles_names = value
		},
		setArticlesNamesLoaded(state, value) {
			state.articles_names_loaded = value
		},
	},
	actions: {
		getArticlesNames({commit}) {
			axios.get('api/articles/names')
			.then(res => {
				commit('setArticlesNames', res.data)
				commit('setArticlesNamesLoaded', true)
				console.log('Se cargaron nombres de articulos')
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
	modules: {
	}
}