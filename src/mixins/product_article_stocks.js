export default {
	computed: {
		product() {
			return this.$store.state.produccion.order_productions.product_article_stocks.model
		},
	},
	methods: {
	}
}