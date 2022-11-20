<template>
<b-card
v-if="sub_view == 'metodos-de-pago'"
class="shadow b-r-1"
title="Metodos de pago">
	<view-component
	:show_previus_days="false"
	model_name_spanish="Metodos de pago"
	create_model_name_spanish="Metodo de pago"
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
			return 'payment_method'
		},
	}
}
</script>