export default {
	methods: {
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
		getOrders() {
			this.$store.dispatch('online/orders/getUnconfirmedOrders')
			this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
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