export default {
	methods: {
		selectedProvider(article) {
			let provider = this.$store.state.provider.models.find(model => {
				return model.id == article.provider_id
			})
			if (typeof provider != 'undefined') {
				return provider
			}
			return null
		},
		getIds(models) {
			let models_id = []
			models.forEach(model => {
				models_id.push(model.id)
			})
			return models_id
		}
	}
}