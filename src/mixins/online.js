export default {
	computed: {
		view() {
			return this.$route.params.view
		},
		buyers() {
			return this.$store.state.online.buyers.buyers
		},
		selected_buyer() {
			return this.$store.state.online.messages.selected_buyer
		},
		messages_not_read() {
			return this.$store.state.online.buyers.messages_not_read
		},
	},
	methods: {
		sendMessage(buyer) {
			this.$router.push({name: 'Online', params: {view: 'mensajes', chat_id: buyer.id}})
			this.$bvModal.hide('unconfirmed-order-details')
			this.$bvModal.hide('confirmed-finished-order-details')
		},
		messagesNotRead(buyer) {
			let messages_not_read = 0
			buyer.messages.forEach(message => {
				if (message.from_buyer && !message.read) {
					messages_not_read++
				} 
			})
			return messages_not_read
		},
		total(order) {
			if (order.articles) {
				let total = 0
				order.articles.forEach(article => {
					total += article.pivot.price * article.pivot.amount 
				})
				return total
			}
			return null
		},
		buyerName(order) {
			if (order.buyer) {
				return `${order.buyer.name} ${order.buyer.surname}`
			}
			return null
		},
		getBuyers() {
			this.$store.dispatch('online/buyers/getBuyers')
		},
		getOrders() {
			this.$store.dispatch('online/orders/getUnconfirmedOrders')
			this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
		},
		getQuestions() {
			this.$store.dispatch('online/questions/getQuestions')
		},
		getExamine() {
			this.$store.dispatch('online/examine/getArticlesMostViewed')
			this.$store.dispatch('online/examine/getSubCategoriesMostViewed')
		},
		getOrdersAndQuestions() {
            this.$store.dispatch('online/orders/getUnconfirmedOrders')
            this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
            this.$store.dispatch('online/questions/getQuestions')
		},
		getVariant(article) {
			return article.variants.find(variant => {
				return variant.id == article.pivot.variant_id
			})
		},
		articleName(article) {
			if (article.pivot.variant_id) {
				return article.name + ' ' + this.getVariant(article).description
			}
			return article.name
		},
	}
}