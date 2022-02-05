export default {
	computed: {
		brands() {
			return this.$store.state.brands.brands
		},
		brands_options() {
			let options = []
			options.push({text: 'Seleccione una marca', value: 0})
			this.brands.forEach(brand => {
				options.push({text: brand.name, value: brand.id})
			})
			return options
		},
	},
}