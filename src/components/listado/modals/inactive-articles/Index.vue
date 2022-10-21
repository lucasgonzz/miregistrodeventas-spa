<template>
<b-modal
size="xl"
id="inactive-articles"
title="Articulos inactivos"
hide-footer>
	<btn-update-list></btn-update-list>
	<list></list>
</b-modal>
</template>
<script>
import BtnUpdateList from '@/components/listado/modals/inactive-articles/BtnUpdateList'
import List from '@/components/listado/modals/inactive-articles/List'
export default {
	components: {
		BtnUpdateList,
		List,
	},
	computed: {
		model_name() {
			return 'article'
		},
		models() {
			return this.$store.state[this.model_name].inactive_models
		},
	}
}
</script>