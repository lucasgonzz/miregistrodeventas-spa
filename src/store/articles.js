import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		articles_names: [],
		articles: [],
		bar_codes: [],
		articles_names_loaded: false
	},
	getters: {
	},
	mutations: {
		setArticles(state, articles) {
			state.articles = articles
		},
		addArticle(state, article) {
			state.articles.push(article)
		},
		setBarCodes(state, bar_codes) {
			state.bar_codes = bar_codes
		},
		addBarCode(state, bar_code) {
			state.bar_codes.push(bar_code)
		},
		setArticlesNames(state, value) {
			state.articles_names = value
		},
		addArticleName(state, article) {
			state.articles_names.push({id: article.id, name: article.name})
		},
		setArticlesNamesLoaded(state, value) {
			state.articles_names_loaded = value
		},
	},
	actions: {
		getArticles({ commit }) {
			axios.get('/api/articles')
			.then(res => {
				commit('setArticles', res.data)
				console.log('Se cargaron  articulos')
			})
			.catch(err => {
				console.log(err)
			})
		},
		getBarCodes({ commit }) {
			axios.get('/api/articles/bar-codes')
			.then(res => {
				commit('setBarCodes', res.data)
			})
			.catch(err => {
				console.log(err)
			})
		},
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
