<template>
<b-row
v-show="show">
	<b-col class="j-start">
		<articles-drop-down
		class="m-r-15"
		from_filter></articles-drop-down>
		<articles-drop-down></articles-drop-down>
	</b-col>
</b-row>
</template>
<script>
import ArticlesDropDown from '@/components/listado/components/ArticlesDropDown'
export default {
	components: {
		ArticlesDropDown,
	},
	computed: {
		show() {
			return this.filtered.length || this.selected_articles.length
		},
		filtered() {
			return this.$store.state.articles.filtered
		},
		selected_articles() {
			return this.$store.state.articles.selected_articles
		}
	}
}
</script>