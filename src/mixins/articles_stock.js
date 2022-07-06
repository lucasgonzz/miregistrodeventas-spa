export default {
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		stock_0() {
			return this.articles.filter(item => {
				return item.stock != null && item.stock == 0 
			})
		},
		stock_min() {
			return this.articles.filter(item => {
				return item.stock && item.stock_min && item.stock <= item.stock_min
			})
		},
	}
}