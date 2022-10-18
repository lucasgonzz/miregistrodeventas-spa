<template>
	<view-component 
	model_name="budget"
	model_name_spanish="Presupuestos"
	create_model_name_spanish="Nuevo presupuesto">
		<template #modal_buttons>
			<modal-buttons></modal-buttons>
		</template>
	</view-component>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
import ModalButtons from '@/components/presupuestos/components/ModalButtons'
export default {
	components: {
		ViewComponent,
		ModalButtons,
	},
}
</script>