import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import { VueOfflineStorage  } from 'vue-offline'
export default {
	namespaced: true,
	state: {
		articles: [],
		new_articles: [],
		articles_to_show: [],
		article_to_edit: {},
		article_to_delete: {},
		article_providers_history: {},
		images_copy: {},
		images_to_show: {},
		images_slide: 0,
		all_articles_selected: false,
		bar_codes: [],
		selected_articles: [],
		loading: false,
		is_filter: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setIsFilter(state, value) {
			state.is_filter = value
		},
		setAllArticlesSelected(state, value) {
			state.all_articles_selected = value
		},
		setArticles(state, articles) {
			state.articles = null
			state.articles = articles
			console.log('setArticles')
			console.log(articles)
		},
		setArticlesToShow(state, value) {
			if (value) {
				state.articles_to_show = value
			} else {
				state.articles_to_show = state.articles.slice(0, 10)
			}
		},
		addArticlesToShow(state) {
			let length = state.articles_to_show.length
			let articles_to_add = state.articles.slice(length, length+10)
			state.articles_to_show = state.articles_to_show.concat(articles_to_add)
			console.log('addArticlesToShow')
			console.log(articles_to_add)
		},
		addArticleToShow(state, value) {
			state.articles_to_show.unshift(value)
		},
		addArticle(state, article) {
			let index = state.articles.findIndex(art => {
				return art.id == article.id
			})
			if (index == -1) {
				state.articles.unshift(article)
				if (article.bar_code) {
					state.bar_codes.unshift(article.bar_code)
				}
			}
		},
		addBarCode(state, value) {
			state.bar_codes.unshift(value)
		},
		update(state, article) {
			let index 
			index = state.articles.findIndex(art => {
				return art.id == article.id
			})
			state.articles.splice(index, 1, article)
			state.bar_codes.splice(index, 1, article.bar_code)

			index = state.articles_to_show.findIndex(art => {
				return art.id == article.id
			})
			if (index != -1) {
				state.articles_to_show.splice(index, 1, article)
			}
		},	
		setImagesToShow(state, value) {
			state.images_to_show = null
			state.images_to_show = value
		},
		setImagesSlide(state, value) {
			state.images_slide = value
		},
		setSelectedArticles(state, value) {
			state.selected_articles = value
		},
		setEdit(state, value) {
			state.article_to_edit = value
		},
		setDelete(state, value) {
			state.article_to_delete = value
		},
		delete(state) {
			let index 
			state.selected_articles.forEach(selected_article => {
				index = state.articles.findIndex(art => {
					return art.id == selected_article.id
				})
				state.articles.splice(index, 1)
				
				index = state.articles_to_show.findIndex(art => {
					return art.id == selected_article.id
				})
				if (index != -1) {
					state.articles_to_show.splice(index, 1)
				}
				
				index = state.bar_codes.findIndex(bar_code => {
					return bar_code == selected_article.bar_code
				})
				if (index != -1) {
					state.bar_codes.splice(index, 1)
				}
			})
		},
		setProvidersHistory(state, value) {
			state.article_providers_history = value
		},
		setImagesCopy(state, value) {
			state.images_copy = value
		},
		setBarCodes(state) {
			state.bar_codes = []
			state.articles.forEach(article => {
				state.bar_codes.push(article.bar_code)
			})
		},
		updateStock(state, sales) {
			sales.forEach(sale => {
				sale.articles.forEach(art => {
					let article = state.articles.find(ar => {
						return ar.id == art.id
					})
					if (typeof article != 'undefined' && article.stock) {
						article.stock += Number(art.pivot.amount)
					}
				})
			})
		},
		removeStock(state, articles) {
			let article = {}
			articles.forEach(art => {
				article = state.articles.find(ar => {
					return ar.id == art.id
				})
				if (article.stock) {
					article.stock -= art.amount
				}
			})
		}
	},
	actions: {
		setArticlesToShow({ commit, state }) {
			let current_page = state.current_page
			let articles = state.articles
			let articles_listado = articles.slice(current_page*state.per_page, current_page*state.per_page+state.per_page)
			commit('incrementPage')
			commit('addArticlesListado', articles_listado)
		},
		getArticles({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/articles')
			.then(res => {
				// VueOfflineStorage.set('articles', res.data.articles)
				commit('setLoading', false)
				commit('setArticles', res.data.articles)
				console.log('getArticles')
				console.log(res.data.articles)
				commit('setArticlesToShow')
				commit('setBarCodes')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
	},
	modules: {
	}
}
