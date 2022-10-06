export default {
	computed: {
		selected_articles() {
			return this.$store.state.article.selected
		},
		selected_articles_id() {
			let ids = []
			this.selected_articles.forEach(art => {
				console.log(art)
				ids.push(art.id)
			})
			return ids
		}
	},
}