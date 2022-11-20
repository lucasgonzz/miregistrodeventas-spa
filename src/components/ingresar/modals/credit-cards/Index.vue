<template>
<b-modal
hide-footer
title="Tarjetas"
id="credit-cards">
	<view-component
	:show_previus_days="false"
	model_name_spanish="Tarjetas"
	create_model_name_spanish="Tarjeta"
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
			return 'credit_card'
		},
	}
}
</script>