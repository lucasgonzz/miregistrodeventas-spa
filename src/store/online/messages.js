import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import buyers from '@/store/online/buyers'
import online from '@/mixins/online'
export default {
	namespaced: true,
	state: {
		selected_buyer: null,
		chats_to_show: [],
		loading: false,
	},
	mutations: {
		setSelectedBuyer(state, buyer) {
			state.selected_buyer = buyer
		},
		setChatsToShow(state, value = null) {
			if (!value) {
				value = buyers.state.buyers
			}
			value.sort((a, b) => (online.methods.messagesNotRead(a) < online.methods.messagesNotRead(b)) ? 1 : -1)
			state.chats_to_show = value
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
				let index = buyers.state.buyers.findIndex(buyer => {
					return buyer.id == buyer_id
				})
				buyers.state.buyers[index].messages = res.data.messages
			})
			.catch(err => {
				console.log(err)
			})
		},
		setMessagesRead({ state }) {
			return axios.get('api/messages/set-read/'+state.selected_buyer.id)
			.then(res => {
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
	}
}
