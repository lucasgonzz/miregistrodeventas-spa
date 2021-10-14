export default {
	computed: {
		new_cupon() {
			return this.$store.state.online.cupons.new_cupon
		},
		active_cupons() {
			return this.$store.state.online.cupons.active_cupons
		},
		loading() {
			return this.$store.state.online.cupons.loading
		},
	}
}