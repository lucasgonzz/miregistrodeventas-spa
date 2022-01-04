export default {
	computed: {
		prices_lists() {
			return this.$store.state.prices_lists.prices_lists
		},
	},
	methods: {
		print(prices_list) {
			let link = process.env.VUE_APP_API_URL+'/prices-lists/'+prices_list.id
			window.open(link)
		}
	}
}