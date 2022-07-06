export default {
	computed: {
		locations() {
			return this.$store.state.locations.models
		},
		locations_options() {
			let options = []
			options.push({
				value: 0,
				text: 'Seleccione localidad'
			})
			this.locations.forEach(item => {
				options.push({
					value: item.id,
					text: item.name,
				})
			})
			return options
		}
	}
}