<template>
<b-modal
size="xl"
id="inactive-articles"
title="Articulos inactivos"
hide-footer>
	
	<table-component
	:model_name="model_name"
	:models="models"
	model_name_spanish="articulos"></table-component>
</b-modal>
</template>
<script>
import TableComponent from '@/components/common/display/TableComponent'
export default {
	components: {
		TableComponent,
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