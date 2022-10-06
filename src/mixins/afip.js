export default {
	computed: {
		has_warnings() {
			if (!this.sale.client.cuit || this.sale.client.cuit == '') {
				return true
			}
			return false
		},
		loading() {
			return this.$store.state.sale.afip.loading
		},
		sale() {
			return this.$store.state.sale.afip.sale
		},
		importes() {
			return this.$store.state.sale.afip.importes
		},
	},
	methods: {
		printAfipTicket(sale) {
			let link = process.env.VUE_APP_API_URL+'/sales/pdf/'+sale.id+'/1/1'
			window.open(link)
		},
	}
}