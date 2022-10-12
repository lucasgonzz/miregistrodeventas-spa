export default {
	computed: {
		updating() {
			return this.$store.state.vender.previus_sales.updating
		},
		client() {
			return this.$store.state.vender.client
		},
		items() {
			return this.$store.state.vender.items
		},
		index_previus_sales() {
			return this.$store.state.vender.previus_sales.index
		},
		previus_sale() {
			return this.$store.state.vender.previus_sales.previus_sale
		},
	},
	methods: {
		updatePreviusSale() {
			this.$store.dispatch('vender/previus_sales/updatePreviusSale', {
				client_id: this.client ? this.client.id : null, 
				items: this.items, 
				dolar_blue: this.dolar_blue
			})
			.then(res => {
				this.$toast.success('Venta actualizada')
			})
		},
	}
}