import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		articles: [],
		loading: false,
		articles_listado: [],
		current_page: 1,
		per_page: 10,
		article_views: {},
		bar_codes: [],
		articles_names_loaded: false
	},
	getters: {
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setArticles(state, articles) {
			state.articles = articles
		},
		setArticlesListado(state, articles_listado) {
			state.articles_listado = state.articles.slice(0, state.per_page)
		},
		addArticlesListado(state, articles_listado) {
			state.articles_listado = state.articles_listado.concat(articles_listado)
		},
		incrementPage(state) {
			state.current_page++
		},
		setPage(state, page) {
			state.current_page = page
		},
		setArticleViews(state, article) {
			state.article_views = article
		},
		addArticle(state, article) {
			state.articles.unshift(article)
		},
		setBarCodes(state) {
			state.articles.forEach(art => {
				state.bar_codes.push(art.bar_code)
			})
		},
		updateArticle(state, article) {
			let index = state.articles.find(art => {
				return art.id == article.id
			})
			state.articles.splice(index, 1, article)
			state.bar_codes.splice(index, 1, article.bar_code)
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
		setArticlesListado({ commit, state }) {
			let current_page = state.current_page
			let articles = state.articles
			let articles_listado = articles.slice(current_page*state.per_page, current_page*state.per_page+state.per_page)
			commit('incrementPage')
			commit('addArticlesListado', articles_listado)
		},
		getArticles({ commit }) {
			commit('setLoading', true)
			axios.get('/api/articles')
			.then(res => {
				commit('setLoading', false)
				console.log(res.data)
				commit('setArticles', res.data.articles)
				commit('setArticlesListado')
				commit('setBarCodes')
			})
			.catch(err => {
				commit('setLoading', false)
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
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
	modules: {
	}
}
