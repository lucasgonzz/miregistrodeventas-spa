<template>
	<div 
	class="p-15"
	v-if="selected_articles.length">
		<b-button
		block 
		v-b-modal="'create-prices-list'"
		variant="primary">
			<i class="icon-plus"></i>
			Nueva lista de precios
		</b-button>
	</div>
</template>
<script>
export default {
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
	},
}
</script>