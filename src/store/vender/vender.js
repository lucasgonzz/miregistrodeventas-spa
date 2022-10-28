// import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_sales from '@/store/vender/previus_sales'
import clients from '@/store/vender/clients'
import auth from '@/store/auth'
import discounts_store from '@/store/discount'
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
		total: 0,
		client: null,
		with_card: false,
		discounts_id: [],
		price_type: null,
		save_current_acount: 1,
		make_current_acount_pago: 0,
		save_nota_credito: 0,
		nota_credito_description: '',

		returned_articles: [],

		sub_categories: [],

		sale_type: null,
		vendiendo: false,
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
		setDiscountsId(state, value) {
			state.discounts_id = value
		},
		addDiscountId(state, value) {
			console.log(value)
			state.discounts_id.push(value)
		},
		setPriceType(state, value) {
			state.price_type = value
		},
		setSaveCurrentAcount(state, value) {
			state.save_current_acount = value
		},
		setMakeCurrentAcountPago(state, value) {
			state.make_current_acount_pago = value
		},
		setSaveNotaCredito(state, value) {
			state.save_nota_credito = value
		},
		setNotaCreditoDescription(state, value) {
			state.nota_credito_description = value
		},
		setReturnedArticles(state, value) {
			state.returned_articles = value
		},
		addReturnedArticle(state, value) {
			let index = state.returned_articles.findIndex(item => {
				return item.id == value.id 
			})
			if (index == -1) {
				state.returned_articles.push(value)
			} else {
				state.returned_articles.splice(index, 1, value)
			}
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
				if (state.discounts_id.length) {
					let discounts = discounts_store.state.models 
					console.log(discounts) 
					let sale_discounts = []
					state.discounts_id.forEach(id => {
						sale_discounts.push(discounts.find(item => item.id == id))
					}) 
					console.log(sale_discounts) 
					let dis 
					sale_discounts.forEach(discount => {
						dis = state.total * Number(discount.percentage) / 100
						console.log('restando '+dis+' a '+state.total)
						state.total -= dis 
					})
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
				discounts_id: state.discounts_id,
				save_current_acount: state.save_current_acount,
				make_current_acount_pago: state.make_current_acount_pago,
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
				commit('setDiscountsId', [])
				commit('setSaleType', 1)
				commit('setClient', null)
				commit('setTotal', 0)
				commit('sale/add', sale, {root: true})
				commit('sale/setTotal', null, {root: true})
				commit('sale/setToShow', null, {root: true})
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
