export default {
	methods: {
		setPreviusSaleArticles(articles) {
			articles.forEach(article => {
				article.amount = Number(article.pivot.amount)
				article.original_price = article.price
			})
			return articles
		},
		getSpecialPrice(article, special_price_id) {
			let special_price_ = article.original_price
			article.special_prices.forEach(special_price => {
				if (special_price.pivot.special_price_id == special_price_id) {
					special_price_ = Number(special_price.pivot.price)
				}
			})
			return special_price_
		},
		setOriginalPrice(article) {
			article.original_price = parseFloat(article.price)
			return article
		},
		clearVender() {
			this.$store.commit('vender/setArticles', [])
			this.$store.commit('vender/setDebt', null)
			this.$store.commit('vender/setTotal', 0)
			this.$store.commit('vender/setWithCard', false)
			this.$store.commit('vender/previus_sales/setIndex', 0)
			this.$store.commit('vender/previus_sales/setPreviusSale', {})
		},
	}
}