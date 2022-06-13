import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		order: null,
		provider: {},
		articles: [],

		article_received: {},
	},
	mutations: {
		setOrder(state, value) {
			state.order = value
		},
		setProvider(state, value) {
			state.provider = value
		},
		setArticles(state, value) {
			state.articles = value
		},
		addArticle(state, value) {
			state.articles.push(value)
		},
		deleteItem(state, value) {
			let index = state.articles.findIndex(item => {
				return item.id == value.id
			})
			if (index != -1) {
				state.articles.splice(index, 1)
			}
		},
		setArticleReceived(state, value) {
			state.article_received = value
		},
	},
	actions: {
		delete({ commit, state }) {
			axios.delete('/api/provider-orders/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
	modules: {
	}
}
