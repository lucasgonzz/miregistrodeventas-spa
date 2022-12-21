<template>
<b-card
v-if="sub_view == 'zonas-de-envio'"
class="shadow b-r-1"
title="Zonas de envio">
	<view-component
	:show_previus_days="false"
	model_name_spanish="Zonas de envio"
	create_model_name_spanish="Zona de envio"
	:model_name="model_name"></view-component>
</b-card>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		ViewComponent,
	},
	computed: {
		model_name() {
			return 'delivery_zone'
		},
	}
}
</script>