<template>
	<b-row class="j-center" 
	v-show="!is_filter && articles_to_show.length >= 10 && articles_to_show.length < articles.length && !loading">
		<b-col
		md="4">
			<b-button
			@click="addArticles"
			block
			variant="primary">
				Cargar mas
			</b-button>
		</b-col>
	</b-row>
</template>
<script>
export default {
	name: 'AddArticles',
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		articles_to_show() {
			return this.$store.state.articles.articles_to_show
		},
		loading() {
			return this.$store.state.articles.loading
		},
		is_filter() {
			return this.$store.state.articles.is_filter
		},
	},
	methods: {
		addArticles() {
			this.$store.commit('articles/addArticlesToShow')
		}
	}
}
</script>