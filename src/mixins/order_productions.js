export default {
	computed: {
		order_productions() {
			return this.$store.state.produccion.order_productions.models
		},
		loading() {
			return this.$store.state.produccion.order_productions.loading
		},
		edit() {
			return this.$store.state.produccion.order_productions.edit
		},
	},
	methods: {
		statuses() { 
			if (this.edit) {
				let statuses = this.$store.state.produccion.order_productions.statuses.models
				let result =  []
				statuses.forEach(status => {
					if (status.name == 'Colocación') {
						if (this.edit.budget.delivery_and_placement) {
							result.push(status)
						} 
					} else {
						result.push(status)
					}
				})
				return result
			}
		},
	}
}