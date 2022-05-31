import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import buyers_store from '@/store/online/buyers'
import online from '@/mixins/online'
export default {
	namespaced: true,
	state: {
		selected_buyer: null,
		chats_to_show: [],
		show_articles: false,
		selected_article: null,
		loading: false,
	},
	mutations: {
		setSelectedBuyer(state, buyer) {
			state.selected_buyer = buyer
		},
		setShowArticles(state, value) {
			state.show_articles = value
		},
		setSelectedArticle(state, value) {
			state.selected_article = value
		},
		setChatsToShow(state, value = null) {
			let buyers = []
			buyers_store.state.buyers.forEach(buyer => {
				if (buyer.messages.length) {
					buyers.push(buyer)
				}
			})
			let buyers_sort = buyers.sort((a, b) => (new Date(b.messages[b.messages.length - 1].created_at) - new Date(a.messages[a.messages.length - 1].created_at)))
			state.chats_to_show = buyers_sort
		},
		setLoading(state, value) {
			state.loading = value
		},
	},
	actions: {
		getMessages({ commit, state }, buyer_id = null) {
			if (!buyer_id) {
				buyer_id = state.selected_buyer.id
			}
			return axios.get('api/messages/'+buyer_id)
			.then(res => {
				let index = buyers_store.state.buyers.findIndex(buyer => {
					return buyer.id == buyer_id
				})
				console.log(index)
				buyers_store.state.buyers[index].messages = res.data.messages
			})
			.catch(err => {
				console.log(err)
			})
		},
		setMessagesRead({ state }) {
			return axios.get('api/messages/set-read/'+state.selected_buyer.id)
			.catch(err => {
				console.log(err)
			})
			console.log('Se marcaron como leidos')
		}
	},
	modules: {
	}
}
