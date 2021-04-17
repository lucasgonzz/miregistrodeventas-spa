<template>
<b-row v-show="is_filter">
	<b-col class="j-start">
		<strong>{{ articles.length }} artículos filtrados</strong>
	</b-col>
</b-row>
</template>
<script>
export default {
	computed: {
		is_filter() {
			return this.$store.state.articles.is_filter
		},
		articles() {
			return this.$store.state.articles.articles_to_show
		}
	}
}
</script>