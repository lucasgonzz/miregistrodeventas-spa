<template>
<b-modal
hide-footer
title="Depositos"
id="deposits">
	<view-component
	:show_previus_days="false"
	model_name_spanish="Depositos"
	create_model_name_spanish="deposito"
	:model_name="model_name"></view-component>
</b-modal>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		ViewComponent,
	},
	computed: {
		model_name() {
			return 'deposit'
		},
	}
}
</script>