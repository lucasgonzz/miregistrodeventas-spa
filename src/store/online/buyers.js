import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import messages from '@/store/online/messages'
export default {
	namespaced: true,
	state: {
		buyers: [],
		messages_not_read: 0,
		loading: false,
	},
	mutations: {
		setBuyers(state, buyers) {
			buyers.forEach(b => {
				b.messages.reverse()
			})
			state.buyers = buyers
		},
		setMessagesNotRead(state) {
			state.messages_not_read = 0
			state.buyers.forEach(buyer => {
				buyer.messages.forEach(message => {
					if (message.from_buyer && !message.read) {
						state.messages_not_read++
					}
				})
			})
		},
		setMessagesRead(state, buyer) {
			let index = state.buyers.findIndex(b => {
				return b.id == buyer.id
			})
			state.buyers[index].messages.forEach(message => {
				if (message.from_buyer && !message.read) {
					message.read = 1
				}
			})
		},
		addMessage(state, message) {
			let index = state.buyers.findIndex(b => {
				return b.id == message.buyer_id
			})
			let repeated = state.buyers[index].messages.findIndex(m => {
				return m.id == message.id
			})
			if (repeated == -1) {
				state.buyers[index].messages.push(message) 
			}
		},
		addBuyerMessage(state, value) {
			let index = state.buyers.findIndex(buyer => {
				return buyer.id == messages.state.selected_buyer.id
			})
			state.buyers[index].messages.push(value)
		},
		setLoading(state, value) {
			state.loading = value
		},
	},
	actions: {
		getBuyers({ commit }) {
			commit('setLoading', true)
			axios.get('/api/buyers')
			.then(res => {
				commit('setLoading', false)
				commit('setMessagesNotRead')
				commit('setBuyers', res.data.buyers)
				commit('online/messages/setChatsToShow', res.data.buyers, {root: true})
				console.log('getBuyers', res.data.buyers)
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
