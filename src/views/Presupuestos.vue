<template>
	<view-component
	show_filter_modal
	show_btn_pdf
	model_name="budget">
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