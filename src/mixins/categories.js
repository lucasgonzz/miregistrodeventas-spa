export default {
	computed: {
		categories() {
			return this.$store.state.categories.categories
		},
		categories_options() {
			let options = []
			options.push({text: 'Seleccione una categoria', value: 0})
			this.categories.forEach(category => {
				options.push({text: category.name, value: category.id})
			})
			return options
		},
	},
}