import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		articles_most_viewed: [],
		articles_most_viewed_weeks_ago: 1,
		loading_articles_most_viewed:false,
		sub_categories_most_viewed: [],
		sub_categories_most_viewed_weeks_ago: 1,
		loading_sub_categories_most_viewed: false,
		viewable_to_show_views: {},
		buyer_views: {},
	},
	mutations: {
		setArticlesMostViewed(state, value) {
			state.articles_most_viewed = value
		},
		setArticlesMostViewedWeeksAgo(state, value) {
			state.articles_most_viewed_weeks_ago = value
		},
		setLoadingArticlesMostViewed(state, value) {
			state.loading_articles_most_viewed = value
		},
		setSubCategoriesMostViewed(state, value) {
			state.sub_categories_most_viewed = value
		},
		setSubCategoriesMostViewedWeeksAgo(state, value) {
			state.sub_categories_most_viewed_weeks_ago = value
		},
		setLoadingSubCategoriesMostViewed(state, value) {
			state.loading_sub_categories_most_viewed = value
		},
		setViewableToShowViews(state, value) {
			console.log(value)
			state.viewable_to_show_views = value
		},
		setBuyerViews(state, value) {
			state.buyer_views = value
		},
	},
	actions: {
		getArticlesMostViewed({ state, commit }) {
			commit('setLoadingArticlesMostViewed', true)
			axios.get('/api/articles/most-viewed/'+state.articles_most_viewed_weeks_ago)
			.then(res => {
				commit('setLoadingArticlesMostViewed', false)
				console.log(res.data.articles)
				commit('setArticlesMostViewed', res.data.articles)
			})
			.catch(err => {
				commit('setLoadingArticlesMostViewed', false)
				console.log(err)
			})
		},
		getSubCategoriesMostViewed({ state, commit }) {
			commit('setLoadingSubCategoriesMostViewed', true)
			axios.get('/api/sub-categories/most-viewed/'+state.sub_categories_most_viewed_weeks_ago)
			.then(res => {
				console.log(res.data.sub_categories)
				commit('setLoadingSubCategoriesMostViewed', false)
				commit('setSubCategoriesMostViewed', res.data.sub_categories)
			})
			.catch(err => {
				commit('setLoadingSubCategoriesMostViewed', false)
				console.log(err)
			})
		},
	},
	modules: {
	}
}
