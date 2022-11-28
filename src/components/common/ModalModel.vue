<template>
<b-modal
hide-footer
:title="title"
:id="model_name">
	<view-component
	:show_previus_days="false"
	:model_name="model_name"></view-component>
</b-modal>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		ViewComponent,
	},
	props: {
		model_name: String,
	},
	computed: {
		title() {
			return require('@/models/'+this.model_name).default.plural_model_name_spanish
		},
	}
}
</script>