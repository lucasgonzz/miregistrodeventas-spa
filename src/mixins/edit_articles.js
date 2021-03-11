export default {
	computed: {
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
	},
	methods: {
		setArticle(article) {
			console.log('setArticle')
			console.log(article)
			let new_article = {}
			new_article.id = article.id
			new_article.bar_code = article.bar_code
			if (article.category_id) {
				new_article.category_id = article.category_id
				new_article.category = article.category
			} else {
				new_article.category_id = 0
			}
			new_article.name = article.name
			new_article.cost = article.cost
			new_article.price = article.price
			new_article.previus_price = article.previus_price
			new_article.stock = article.stock
			new_article.new_stock = 0
			if (!this.isProvider() && article.providers.length) {
				new_article.provider_id = article.providers[0].id
				new_article.providers = article.providers
			} else {
				new_article.provider_id = 0
			}
			if (this.special_prices.length) {
				if (article.special_prices.length) {
					article.special_prices.forEach(special_price => {
						new_article[special_price.name] = special_price.pivot.price
					})
				}
			}
			new_article.created_at = article.created_at
			new_article.updated_at = article.updated_at
			new_article.creado = this.date(article.created_at)+' '+this.since(article.created_at)
			new_article.actualizado = this.date(article.updated_at)+' '+this.since(article.updated_at)
			return new_article
		},
	}
}