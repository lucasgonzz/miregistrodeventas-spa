export default {
	computed: {
		selected_sales() {
			return this.$store.state.sale.selected
		},
		sale_details() {
			return this.$store.state.sale.details
		},
	},
	methods: {
		newPdf(sale_id, with_prices) {
			if (this.user_configuration.limit_items_in_sale_per_page) {
				this.$bvModal.show('print-sales')
			} else {
	            let link = process.env.VUE_APP_API_URL+'/sale/new-pdf/'+sale_id+'/'+with_prices
	            window.open(link)
			}
		},
	}
}