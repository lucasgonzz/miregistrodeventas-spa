import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		model: {},
		name: '',
		price: '',
		articles: [],
	},
	mutations: {
		setModel(state, value) {
			state.model = value
		},
		setName(state, value) {
			state.name = value
		},
		setPrice(state, value) {
			state.price = value
		},
		setArticles(state, value) {
			state.articles = value
		},
		addArticle(state, value) {
			state.articles.unshift(value)
		},
		deleteArticle(state, value) {
			let index = state.articles.findIndex(model => {
				return model.id == value.id
			})
			if (index != -1) {
				state.articles.splice(index, 1)
			}
		},
	},
}