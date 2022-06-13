export default {
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
		combos() {
			return this.$store.state.combos.models
		},
		edit() {
			return this.$store.state.combos.edit
		},
		delete() {
			return this.$store.state.combos.delete
		},
	}
}