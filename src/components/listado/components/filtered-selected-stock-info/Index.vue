<template>
<b-row>
	<b-col 
	v-show="show"
	cols="12"
	md="6"
	class="j-start">
		<drop-down
		class="m-r-15"
		from_filter></drop-down>
		<drop-down></drop-down>
	</b-col>
	<b-col 
	:offset-md="offset"
	cols="12"
	md="6"
	class="j-end">
		<stock-info></stock-info>
	</b-col>
</b-row>
</template>
<script>
import DropDown from '@/components/listado/components/filtered-selected-stock-info/DropDown'
import StockInfo from '@/components/listado/components/filtered-selected-stock-info/StockInfo'
export default {
	components: {
		DropDown,
		StockInfo,
	},
	computed: {
		offset() {
			if (!this.show) {
				return 6
			}
			return 0
		},
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