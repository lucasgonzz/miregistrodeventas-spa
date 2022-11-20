<template>
<b-card
v-if="sub_view == 'plaquetas'"
class="shadow b-r-1"
title="Plaquetas">
	<view-component
	:show_previus_days="false"
	model_name_spanish="Plaquetas"
	create_model_name_spanish="Plaqueta"
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
			return 'platelet'
		},
	}
}
</script>