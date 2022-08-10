// import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_sales from '@/store/vender/previus_sales'
import clients from '@/store/vender/clients'
import auth from '@/store/auth'
import mixin_vender from '@/mixins/vender'
import general from '@/mixins/general'
import percentage_card_mixin from '@/mixins/percentageCard'
export default {
	namespaced: true,
	state: {
		items: [],
		article: {bar_code: '', provider_code: '', num: '', name: '', amount: ''},
		update_price: {},
		new_article: '',
		article_for_sale: {},
		article_variant: {},
		total: 0,
		client: null,
		with_card: false,
		discounts: [],

		sub_categories: [],

		sale_type: null,
		vendiendo: false,
		special_price_id: 0,
		sale: {},
	},
	mutations: {
		setItems(state, value) {
			state.items = value
		},
		addItem(state, value) {
			state.items.unshift(value)
		},
		setArticle(state, value) { 
			if (!value) {
				state.article.bar_code = ''
				state.article.name = ''
				state.article.amount = ''
			} else {
				state.article = value
			}
		},
		addCombo(state, value) {
			state.items.unshift(value)
		},
		setUpdatePrice(state, value) {
			state.update_price = value
		},
		setNewArticle(state, value) {
			state.new_article = value
		},
		addItem(state, item) {
			state.items.unshift(item)
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
		setSubCategories(state, value) {
			state.sub_categories = value 
		},
		setSaleType(state, value) {
			state.sale_type = value
		},
		setClient(state, value) {
			state.client = value
		},
		setWithCard(state, value) {
			state.with_card = value
		},
		setSale(state, value) {
			state.sale = value
		},
		setTotal(state, total = null) {
			if (total) {
				state.total = total
			} else {
				state.total = 0
				state.items.forEach(item => {
					item.total = general.methods.getTotalArticle(item)
					state.total += general.methods.getTotalArticle(item)
					// item.total = Number(item.price) * item.amount
					// state.total += Number(item.price) * item.amount
				})
				if (state.with_card) {
					let user_percentage_card = auth.state.user.percentage_card
					let percentage_card = 0
					percentage_card = percentage_card_mixin.methods.percentageCardFormated(user_percentage_card)
					state.total = state.total * percentage_card
				} 
			}
		},
		removeItem(state, item) {
			let index = state.items.findIndex(i => {
				return i.id == item.id
			})
			state.items.splice(index, 1)
		},
		updateItem(state, item) {
			let index = state.items.findIndex(art => {
				return art.id == item.id
			})
			state.items.splice(index, 1, item)
		},
	},
	actions: {
		vender({ commit, state }, info) {
			commit('setVendiendo', true)
			console.log('dolar_blue en vender: ')
			console.log(info.dolar_blue)
			return axios.post('/api/sales', {
				items: state.items,
				with_card: state.with_card,
				client_id: state.client ? state.client.id : null ,
				discounts: state.discounts,
				sale_type: state.sale_type,
				dolar_blue: info.dolar_blue,
				selected_address: info.selected_address,
			})
			.then(res => {
				console.log('vendido')
				let sale = res.data.sale
				commit('setSale', sale)
				commit('setVendiendo', false)
				commit('setItems', [])
				commit('setDiscounts', [])
				commit('setSaleType', 1)
				commit('setClient', null)
				commit('setTotal', 0)
				commit('sales/add', sale, {root: true})
				commit('sales/setTotal', null, {root: true})
				commit('sales/setToShow', null, {root: true})
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
