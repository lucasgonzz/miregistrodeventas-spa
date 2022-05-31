export default {
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
		selected_articles_id() {
			let ids = []
			this.selected_articles.forEach(art => {
				ids.push(art.id)
			})
			return ids
		}
	},
}