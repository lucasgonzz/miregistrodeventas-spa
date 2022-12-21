<template>
<b-row>
	<b-col 
	v-show="show"
	cols="12"
	class="j-start">
		<!-- <drop-down
		class="m-r-15"
		from_filter></drop-down> -->
		<drop-down></drop-down>
	</b-col>
</b-row>
</template>
<script>
import DropDown from '@/components/listado/components/filtered-selected/DropDown'
export default {
	components: {
		DropDown,
	},
	computed: {
		show() {
			return this.filtered.length || this.selected_articles.length
		},
		filtered() {
			return this.$store.state.article.filtered
		},
		selected_articles() {
			return this.$store.state.article.selected
		}
	}
}
</script>