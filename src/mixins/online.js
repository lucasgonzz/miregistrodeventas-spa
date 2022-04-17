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
		hasPaymentUpdated(order) {
			if (order.payment) {
				return order.payment.updated
			}
			return false
		},
		getImagesFromSelectedColor(article) {
			return article.images.filter(image => {
				return image.color_id == article.color.id
			})
		},
		showMap(address) {
			let location = {
				lat: Number(address.lat),
				lng: Number(address.lng),
			}
			this.$store.commit('map/setLocation', location)
			this.$store.commit('map/setTitle', this.getAddress(address))
			this.$bvModal.show('map-address')
			console.log('se mostro mapa')
		},
		cancel(order) {
			this.$store.commit('online/orders/setCancel', order)
			this.$bvModal.show('cancel-order')
		},
		hasArticle(message) {
			return message.article
		},
		getAddress(address) {
			if (address) {
				return address.street + ' ' + address.street_number 
			}
		},
		sendMessage(buyer) {
			this.$router.push({name: 'Online', params: {view: 'mensajes', chat_id: buyer.id}})
			this.$store.commit('online/messages/setSelectedBuyer', buyer)
			this.$bvModal.hide('order-details')
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
					total += this.articlePrice(article, true, false) * article.pivot.amount 
				})
				if (order.percentage_card) {
					total = total + (total * this.percentageToMultiply(order.percentage_card))
				}
				return this.discountCupons(total, order)
			}
			return null
		},
		discountCupons(total, order) {
			if (order.cupons.length) {
				order.cupons.forEach(cupon => {
					if (cupon.amount) {
						total -= cupon.amount
					} else {
						total = total - (total * this.percentageToMultiply(cupon.percentage))
					}
				})
			}
			return total
		},
		totalArticles(order) {
			if (order.articles) {
				let total = 0
				order.articles.forEach(article => {
					total += article.pivot.amount 
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
		getActiveCupons() {
			this.$store.dispatch('online/cupons/getActiveCupons')
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
		getCalls() {
			this.$store.dispatch('online/calls/getCalls')
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