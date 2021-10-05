export default {
	computed: {
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		// categories() {
		// 	return this.$store.state.categories.categories
		// },
		// sub_categories() {
		// 	return this.$store.state.sub_categories.sub_categories
		// },
	},
	methods: {
		editArticle(article) {
			this.$store.commit('articles/setEdit', this.setArticle(article))
			this.$bvModal.show('edit-article')
		},
		setArticle(article) {
			console.log(article)
			let new_article = {}
			new_article.id = article.id
			new_article.bar_code = article.bar_code
			if (article.sub_category_id) {
				console.log(article.sub_category_id)
				new_article.sub_category_id = article.sub_category_id
				new_article.sub_category = article.sub_category
				new_article.category_id = article.sub_category.category_id
			} else {
				new_article.sub_category_id = 0
				new_article.category_id = 0
			}
			new_article.name = article.name
			new_article.cost = article.cost
			new_article.price = article.price
			new_article.previus_price = article.previus_price
			new_article.images = article.images
			new_article.variants = article.variants
			new_article.tags = article.tags
			if (article.descriptions.length == 0) {
				new_article.descriptions = [{
					title: '',
					content: '',
				}]
			} else {
				new_article.descriptions = article.descriptions
			}
			new_article.colors = article.colors
			new_article.condition_id = article.condition_id
			new_article.stock = this.stock(article, false)
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
			new_article.act_fecha = true
			return new_article
		},
	}
}