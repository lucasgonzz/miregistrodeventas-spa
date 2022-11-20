<template>
<b-card
v-if="sub_view == 'imagenes'"
class="shadow b-r-1"
title="Imagenes">
	<view-component
	:show_previus_days="false"
	model_name_spanish="Imagenes"
	create_model_name_spanish="Imagen"
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
			return 'title'
		},
	}
}
</script>