export default {
	computed: {
		ivas() {
			return this.$store.state.ivas.models
		},
		iva_options() {
			let options = []
			options.push({
				value: 0, text: 'Seleccione IVA'
			})
			this.ivas.forEach(iva => {
				options.push({value: iva.id, text: iva.percentage})
			})
			return options
		}
	},
}