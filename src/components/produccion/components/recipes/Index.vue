<template>
	<view-component 
	v-if="view == 'recetas'"
	model_name="recipe"
	model_name_spanish="Recetas"
	create_model_name_spanish="Nueva receta"
	:show_previus_days="false"></view-component>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		ViewComponent,
	},
}
</script>