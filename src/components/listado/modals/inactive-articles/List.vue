<template>
<table-component
:model_name="model_name"
:models="models"
:loading="inactive_loading"
model_name_spanish="articulos">
	<template v-slot:default="props">
		<btn-activate
		:model="props.model"></btn-activate>
	</template>
</table-component>
</template>
<script>
import TableComponent from '@/components/common/display/TableComponent'
import BtnActivate from '@/components/listado/modals/inactive-articles/BtnActivate'
export default {
	components: {
		TableComponent,
		BtnActivate,
	},
	computed: {
		model_name() {
			return 'article'
		},
		inactive_loading() {
			return this.$store.state[this.model_name].inactive_loading
		},
		models() {
			return this.$store.state[this.model_name].inactive_models
		},
	}
}
</script>