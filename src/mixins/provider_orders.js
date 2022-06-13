export default {
	computed: {
		provider() {
			return this.$store.state.providers.orders.create.provider
		},
		edit_order() {
			return this.$store.state.providers.orders.create.order
		},
		articles() {
			return this.$store.state.providers.orders.create.articles
		},
		orders() {
			return this.$store.state.providers.orders.models
		},
		to_show() {
			return this.$store.state.providers.to_show
		},
		loading() {
			return this.$store.state.providers.loading
		},
		loading_orders() {
			return this.$store.state.providers.orders.loading
		},
	},
	methods: {
	}
}