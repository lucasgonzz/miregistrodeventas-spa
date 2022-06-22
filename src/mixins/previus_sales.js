export default {
	computed: {
		updating() {
			return this.$store.state.vender.previus_sales.updating
		},
		items() {
			return this.$store.state.vender.items
		},
	},
	methods: {
		updatePreviusSale() {
			this.$store.dispatch('vender/previus_sales/updatePreviusSale', {
				items: this.items, dolar_blue: this.dolar_blue
			})
			.then(res => {
				this.$toast.success('Venta actualizada')
			})
		},
	}
}