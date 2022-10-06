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
			this.$store.commit('article/setModel', {model: this.setArticle(article), properties: []})
			this.$bvModal.show('edit-article')
		},
		setArticle(article) {
			console.log(article)
			let new_article = {}
			new_article.id = article.id
			new_article.num = article.num
			new_article.bar_code = article.bar_code
			new_article.provider_code = article.provider_code
			
			new_article.name = article.name
			new_article.cost = article.cost
			new_article.cost_in_dollars = article.cost_in_dollars
			new_article.apply_provider_percentage_gain = article.apply_provider_percentage_gain
			new_article.price = article.price
			new_article.percentage_gain = article.percentage_gain
			new_article.original_price = article.original_price
			new_article.previus_price = article.previus_price
			new_article.condition_id = article.condition_id 
			new_article.stock = article.stock
			new_article.stock_min = article.stock_min
			new_article.with_dolar = article.with_dolar
			new_article.iva_id = article.iva_id
			new_article.images = article.images  
			new_article.discounts = article.discounts  
			new_article.variants = article.variants 
			new_article.tags = article.tags 
			new_article.sizes = article.sizes 
			new_article.colors = article.colors 
			new_article.descriptions = article.descriptions 

			if (article.sub_category_id) {
				new_article.sub_category_id = article.sub_category.id
				new_article.sub_category = article.sub_category
				new_article.category_id = article.sub_category.category_id
			} else {
				new_article.sub_category_id = 0
				new_article.category_id = 0
			}

			if (article.brand_id) {
				new_article.brand_id = article.brand_id
				new_article.brand = article.brand
			} else {
				new_article.brand_id = 0
			}

			if (!article.discounts.length) {
				new_article.discounts = [{
					percentage: '',
				}]
			}

			if (!article.descriptions.length) {
				new_article.descriptions = [{
					title: '',
					content: '',
				}]
			}
			
			new_article.sizes_id = []
			article.sizes.forEach(size => {
				new_article.sizes_id.push(size.id)
			})

			if (article.providers.length) {
				new_article.provider_id = article.providers[article.providers.length-1].id
				new_article.providers = article.providers
			} else if (article.provider_id) {
				new_article.provider_id = article.provider_id
			} else {
				new_article.provider_id = 0
			}

			new_article.save_provider = 1
			
			if (this.special_prices.length && article.special_prices) {
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
			console.log(new_article)
			return new_article
		},
	}
}