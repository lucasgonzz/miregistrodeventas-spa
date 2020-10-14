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
	}
}