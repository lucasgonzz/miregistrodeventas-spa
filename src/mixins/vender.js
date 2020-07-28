export default {
	methods: {
		setPreviusSalePirces(articles) {
			articles.forEach(article => {
				article.original_price = article.price
			})
			return articles
		}
	}
}