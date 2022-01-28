export default {
	computed: {
		updating() {
			return this.$store.state.vender.previus_sales.updating
		},
		articles() {
			return this.$store.state.vender.articles
		},
	},
	methods: {
		updatePreviusSale() {
			this.$store.dispatch('vender/previus_sales/updatePreviusSale', this.articles)
			.then(res => {
				this.$toast.success('Venta actualizada')
			})
		},
	}
}