<template>
	<div>
		<view-component 
		:show_previus_days="false"
		model_name="user"
		model_name_spanish="Usuarios"
		create_model_name_spanish="Nuevo usuario">
		</view-component>
	</div>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		ViewComponent,
	},
}
</script>