export default {
	computed: {
		providers() {
			return this.$store.state.providers.models
		},
		providers_options() {
			let options = []
			options.push({text: 'Seleccione un proveedor', value: 0})
			this.providers.forEach(provider => {
				options.push({text: provider.name, value: provider.id})
			})
			return options
		},
	},
	methods: {
		orderProvidersHistory(article) {
			let date
			article.providers.forEach(provider => {
				date = provider.pivot.created_at.substring(0,10)
				provider.pivot.created_at_ = new Date(date)
			})
			article.providers.sort((a, b) => b.pivot.created_at_ - a.pivot.created_at_)
		},
		createProvider() {
			this.$store.commit('providers/setModel')
			this.$bvModal.show('provider')
		}
	}
}