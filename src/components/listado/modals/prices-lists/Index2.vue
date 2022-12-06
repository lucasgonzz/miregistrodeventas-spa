<template>
<b-modal
id="prices-lists"
title="Listas de precios"
hide-footer
body-class="p-0"
size="lg">
	<create-btn></create-btn>
	<list></list>
</b-modal>
</template>
<script>
import CreateBtn from '@/components/listado/modals/prices-lists/CreateBtn'
import List from '@/components/listado/modals/prices-lists/List'
export default {
	components: {
		CreateBtn,
		List,
	},
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
	},
}
</script>