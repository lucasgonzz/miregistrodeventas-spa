<template>
	<view-component 
	:show_previus_days="false"
	model_name="super_budget"
	model_name_spanish="Presupuestos"
	create_model_name_spanish="Nuevo presupuesto">
		<template v-slot:modal_buttons="prop">
			<modal-buttons
			:model="prop.model"></modal-buttons>
		</template>
	</view-component> 
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
import ModalButtons from '@/components/super/components/super-budgets/ModalButtons'
export default {
	components: {
		ViewComponent, 
		ModalButtons,
	},
} 
</script> 