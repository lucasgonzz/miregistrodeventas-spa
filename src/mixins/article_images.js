export default {
	computed: {
		article() {
			return this.$store.state.articles.images_to_show
		},
		slide() {
			return this.$store.state.articles.images_slide
		},
		selected_image() {
			return this.article.images ? this.article.images[this.slide] : null
		},
	},
}