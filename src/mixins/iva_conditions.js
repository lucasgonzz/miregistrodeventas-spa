export default {
	computed: {
        iva_conditions() {
            return this.$store.state.iva_conditions.models
        },
        iva_condition_options() {
            let options = []
            options.push({text: 'Seleccione iva', value: 0})
            this.iva_conditions.forEach(iva => {
                options.push({text: iva.name, value: iva.id})
            })
            return options
        },
	}
}