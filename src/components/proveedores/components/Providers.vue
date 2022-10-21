<template>
	<view-component 
	v-if="view == 'proveedores'"
	model_name="provider"
	model_name_spanish="Proveedor"
	create_model_name_spanish="Nueva proveedor"
	:show_previus_days="false">
		<template v-slot:default="slotProps">
			
		</template>
	</view-component>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		ViewComponent,
	},
}
</script>