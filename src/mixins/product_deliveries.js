export default {
	computed: {
		product() {
			return this.$store.state.produccion.order_productions.product_deliveries.model
		},
	},
	methods: {
		getTotalDeliveries(product = this.product) {
			let total = 0
			if (product.deliveries) {
				product.deliveries.forEach(delivery => {
					total += delivery.amount 
				})
			}
			return total
		},
	}
}