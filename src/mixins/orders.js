export default {
	computed: {
		order_details() {
			return this.$store.state.online.orders.order_details
		},
	}
}