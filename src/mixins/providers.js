export default {
	methods: {
		orderProvidersHistory(article) {
			article.providers.forEach(provider => {
				let date = provider.pivot.created_at.substring(0,10)
				provider.pivot.created_at_ = new Date(date)
			})
			article.providers.sort((a, b) => b.pivot.created_at_ - a.pivot.created_at_)
		},
	}
}