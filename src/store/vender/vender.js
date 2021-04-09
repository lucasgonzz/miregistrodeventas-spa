// import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_sales from '@/store/vender/previus_sales'
import clients from '@/store/vender/clients'
import auth from '@/store/auth'
import mixin_vender from '@/mixins/vender'
import percentage_card_mixin from '@/mixins/percentageCard'
export default {
	namespaced: true,
	state: {
		articles: [],
		article_for_sale: {},
		article_variant: {},
		total: 0,
		client: null,
		debt: null,
		with_card: false,
		discounts: [],
		sale_type: null,
		vendiendo: false,
		special_price_id: 0,
		sale: {},
	},
	mutations: {
		setArticles(state, articles) {
			state.articles = articles
		},
		addArticle(state, article) {
			state.articles.unshift(state.article_for_sale)
		},
		setVariant(state, value) {
			state.article_variant = value
		},
		setArticleForSale(state, value) {
			state.article_for_sale = value
		},
		setVendiendo(state, value) {
			state.vendiendo = value
		},
		setDiscounts(state, value) {
			state.discounts = value
		},
		setSaleType(state, value) {
			state.sale_type = value
		},
		setClient(state, value) {
			state.client = value
		},
		setSpecialPriceId(state, value) {
			state.special_price_id = value
		},
		setWithCard(state, value) {
			state.with_card = value
		},
		setSale(state, value) {
			state.sale = value
		},
		// replaceArticle(state, article) {
		// 	let index = state.articles.findIndex(art => {
		// 		return art.id == article.id
		// 	})
		// 	state.articles.splice(index, 1, article)
		// 	// Vue.set(state.articles[index], 'amount', new_amount)
		// },
		setTotal(state, total = null) {
			if (total) {
				state.total = total
			} else {
				state.total = 0
				let price 
				state.articles.forEach(article => {
					if (state.special_price_id == 0) {
						price = Number(article.original_price)
					} else {
						price = mixin_vender.methods.getSpecialPrice(article, state.special_price_id)
					}
					state.total += price * article.amount
				})
				if (state.with_card) {
					let user_percentage_card = auth.state.user.percentage_card
					let percentage_card = 0
					// if (this.previus_sale.percentage_card) {
					// 	percentage_card = this.percentageCardFormated(this.previus_sale.percentage_card)
					// } else {
					// 	percentage_card = this.percentageCardFormated(this.percentage_card)
					// }
					percentage_card = percentage_card_mixin.methods.percentageCardFormated(user_percentage_card)
					state.total = state.total * percentage_card
				} 
			}
		},
		setVendiendo(state, value) {
			state.vendiendo = value
		},
		removeArticle(state, index) {
			state.articles.splice(index, 1)
		},
		updateArticle(state, article) {
			let index = state.articles.findIndex(art => {
				return art.id == article.id
			})
			state.articles.splice(index, 1, article)
		},
		setDebt(state, value) {
			console.log('setDebt: '+value)
			state.debt = value
		},
	},
	actions: {
		vender({ commit, state }) {
			commit('setVendiendo', true)
			return axios.post('/api/sales', {
				articles: state.articles,
				with_card: state.with_card,
				client_id: state.client ? state.client.id : null ,
				debt: state.debt,
				special_price_id: state.special_price_id,
				discounts: state.discounts,
				sale_type: state.sale_type,
			})
			.then(res => {
				console.log('vendiendo')
				let sale = res.data.sale
				commit('setSale', sale)
				commit('setVendiendo', false)
				commit('setDebt', null)
				commit('setArticles', [])
				commit('setTotal', 0)
				commit('sales/addSale', sale, {root: true})
				commit('sales/setTotal', null, {root: true})
				commit('sales/setSalesToShow', null, {root: true})
			})
			.catch(err => {
				commit('setVendiendo', false)
				console.log(err)
			})
		}
	},
	modules: {
		previus_sales,
		clients,
	}
}
