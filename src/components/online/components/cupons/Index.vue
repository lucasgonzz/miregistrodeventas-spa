<template>
	<view-component
	v-if="view == 'cupones'"
	model_name="cupon"
	model_name_spanish="Cupones"
	:show_previus_days="false"
	create_model_name_spanish="Cupon"></view-component>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		ViewComponent,
	}
}
</script>